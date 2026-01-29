"use client";

import { useCartStore } from "@/store/cart";
import { ShoppingCart, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 解决 Hydration 问题：Zustand persist 需要在客户端加载后才显示
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, totalPrice } = useCartStore();

  useEffect(() => setMounted(true), []);
  if (!mounted || items.length === 0) return null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 调用我们马上要写的后端 API
      const response = await fetch('/api/payment/alipay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      
      const data = await response.json();
      if (data.url) {
        // 跳转到支付宝收银台
        window.location.href = data.url;
      } else {
        alert("支付创建失败: " + data.message);
      }
    } catch (error) {
      alert("网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 悬浮按钮 */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform z-50 flex items-center gap-2"
        >
          <ShoppingCart size={24} />
          <span className="font-bold text-sm">{items.length}</span>
        </button>
      )}

      {/* 展开的购物车面板 */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-80 bg-white border border-gray-200 shadow-2xl rounded-sm z-50 flex flex-col animate-in slide-in-from-bottom-5">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-sm">ORDER SUMMARY</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black">
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 max-h-60 overflow-y-auto space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-start text-sm">
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs text-gray-500 uppercase">{item.type}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span>¥{item.price}</span>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline text-xs">移除</button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>¥{totalPrice()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#1677FF] hover:bg-[#1668DC] text-white font-bold py-3 text-sm transition-colors flex justify-center items-center gap-2 rounded-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={16}/> : '支付宝结算'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}