import { NextResponse } from 'next/server';
import { AlipaySdk } from 'alipay-sdk';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export async function POST(request: Request) {
  // 环境变量检查
  const APP_ID = process.env.ALIPAY_APP_ID;
  const PRIVATE_KEY = process.env.ALIPAY_PRIVATE_KEY;
  const PRIVATE_KEY_PATH = process.env.ALIPAY_PRIVATE_KEY_PATH;
  const ALIPAY_PUBLIC_KEY = process.env.ALIPAY_PUBLIC_KEY;
  const ALIPAY_PUBLIC_KEY_PATH = process.env.ALIPAY_PUBLIC_KEY_PATH;
  const GATEWAY = process.env.ALIPAY_GATEWAY;

  if (!APP_ID || !PRIVATE_KEY) {
    console.error("❌ 支付宝配置缺失: 请检查 .env.local 文件");
    return NextResponse.json(
      { message: "Server Config Error: Alipay Env Missing" }, 
      { status: 500 }
    );
  }

  try {
    // 初始化 SDK
    const normalizedPrivateKey = PRIVATE_KEY
      ? PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;
    const normalizedAlipayPublicKey = ALIPAY_PUBLIC_KEY
      ? ALIPAY_PUBLIC_KEY.replace(/\\n/g, '\n')
      : undefined;

    const filePrivateKey = PRIVATE_KEY_PATH
      ? readFileSync(resolve(PRIVATE_KEY_PATH), 'utf-8').trim()
      : undefined;
    const fileAlipayPublicKey = ALIPAY_PUBLIC_KEY_PATH
      ? readFileSync(resolve(ALIPAY_PUBLIC_KEY_PATH), 'utf-8').trim()
      : undefined;

    const privateKey = filePrivateKey ?? normalizedPrivateKey;
    const alipayPublicKey = fileAlipayPublicKey ?? normalizedAlipayPublicKey;

    const alipaySdk = new AlipaySdk({
      appId: APP_ID,
      privateKey,
      keyType: 'PKCS8',
      gateway: GATEWAY, 
      alipayPublicKey,
    });

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "购物车为空" }, { status: 400 });
    }

    // 计算总价
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price, 0);
    // 生成唯一订单号 (避免重复支付测试时报错)
    const outTradeNo = `ORD_${Date.now()}_${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const bizContent = {
      out_trade_no: outTradeNo,
      product_code: 'FAST_INSTANT_TRADE_PAY',
      total_amount: totalAmount.toFixed(2),
      subject: `AI-DEPLOY-HUB: ${items.length} Items`,
      body: JSON.stringify(items.map((i: any) => i.name)),
    };

    // 支付成功后的跳转地址
    const returnUrl = 'http://localhost:3000/pricing?status=success';

    // 生成支付宝收银台 URL (GET)
    const result = alipaySdk.pageExecute('alipay.trade.page.pay', 'GET', {
      bizContent,
      returnUrl,
    });

    // 返回支付宝收银台 URL
    return NextResponse.json({ url: result });

  } catch (error: any) {
    console.error('❌ Alipay SDK Error:', error);
    // 返回详细错误，方便我们在控制台看到具体是 Key 格式不对还是参数不对
    return NextResponse.json(
      { message: error.message || '支付初始化失败' }, 
      { status: 500 }
    );
  }
}
