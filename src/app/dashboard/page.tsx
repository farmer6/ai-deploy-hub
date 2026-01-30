"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Package, User, Lock, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const [orderQuery, setOrderQuery] = useState("");
  const [orders, setOrders] = useState<
    { orderNumber: string; productName: string; amountCny: number; status: string; createdAt: string }[]
  >([]);
  const [orderMessage, setOrderMessage] = useState("");
  const [profile, setProfile] = useState({ name: "", company: "", region: "" });
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getToken = () => (typeof window === "undefined" ? "" : localStorage.getItem("auth_token") ?? "");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    fetch("/api/account/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setProfile({
            name: data.user.name ?? "",
            company: data.user.company ?? "",
            region: data.user.region ?? "",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOrderQuery = async () => {
    setOrderMessage("");
    const token = getToken();
    if (!token) {
      setOrderMessage("请先登录后再查询订单。");
      return;
    }
    const res = await fetch("/api/orders/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: orderQuery }),
    });
    const data = await res.json();
    if (!res.ok) {
      setOrderMessage(data?.message ?? "查询失败，请稍后再试。");
      return;
    }
    setOrders(data?.orders ?? []);
    if ((data?.orders ?? []).length === 0) {
      setOrderMessage("未找到相关订单。");
    }
  };

  const handleSaveProfile = async () => {
    setProfileMessage("");
    const token = getToken();
    if (!token) {
      setProfileMessage("请先登录后再保存资料。");
      return;
    }
    const res = await fetch("/api/account/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    if (!res.ok) {
      setProfileMessage(data?.message ?? "保存失败，请稍后再试。");
      return;
    }
    setProfile({
      name: data.user?.name ?? "",
      company: data.user?.company ?? "",
      region: data.user?.region ?? "",
    });
    setProfileMessage("资料已保存。");
  };

  const handleChangePassword = async () => {
    setPasswordMessage("");
    if (newPassword !== confirmPassword) {
      setPasswordMessage("两次输入的新密码不一致。");
      return;
    }
    const token = getToken();
    if (!token) {
      setPasswordMessage("请先登录后再修改密码。");
      return;
    }
    const res = await fetch("/api/account/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      setPasswordMessage(data?.message ?? "修改失败，请稍后再试。");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("密码已更新。");
  };

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <section className="border-b border-gray-200 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Dashboard / 控制台
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">
            订单与账号管理
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-3 max-w-2xl">
            查询订单、完善个人资料与账号安全设置。
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-700" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Orders
              </h2>
            </div>
            <p className="text-2xl font-bold mt-6">0</p>
            <p className="text-xs text-gray-500 mt-1">当前无已完成订单</p>
          </div>
          <div className="border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-700" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Profile
              </h2>
            </div>
            <p className="text-2xl font-bold mt-6">未完善</p>
            <p className="text-xs text-gray-500 mt-1">请补充资料以便开通服务</p>
          </div>
          <div className="border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-700" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Security
              </h2>
            </div>
            <p className="text-2xl font-bold mt-6">标准</p>
            <p className="text-xs text-gray-500 mt-1">建议定期更新密码</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div className="border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-bold">订单查询</h3>
              </div>
              <Link
                href="/pricing"
                className="text-xs font-bold text-gray-600 hover:text-black border-b border-gray-200 hover:border-black"
              >
                查看服务方案 <ArrowRight className="inline-block w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-4">
              <input
                type="text"
                placeholder="输入订单号或邮箱"
                value={orderQuery}
                onChange={(event) => setOrderQuery(event.target.value)}
                className="h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                onClick={handleOrderQuery}
                className="h-10 px-4 rounded-sm bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                查询订单
              </button>
            </div>
            <div className="mt-6 border border-dashed border-gray-200 p-6 text-sm text-gray-500 space-y-3">
              {orders.length === 0 ? (
                <p>{orderMessage || "暂无查询结果。输入订单号后可查看付款状态、交付内容与下载链接。"}</p>
              ) : (
                orders.map((order) => (
                  <div key={order.orderNumber} className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-900">
                      {order.productName}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>订单号：{order.orderNumber}</span>
                      <span>金额：¥{order.amountCny}</span>
                      <span>状态：{order.status}</span>
                      <span>时间：{new Date(order.createdAt).toLocaleDateString("zh-CN")}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold">账户个人资料</h3>
            <p className="text-xs text-gray-500 mt-2">
              填写基本信息，便于我们提供服务支持。
            </p>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="profileName">
                  姓名 / 称呼
                </label>
                <input
                  id="profileName"
                  type="text"
                  placeholder="例如：Alex"
                  value={profile.name}
                  onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                  className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="profileCompany">
                  公司 / 团队
                </label>
                <input
                  id="profileCompany"
                  type="text"
                  placeholder="可选"
                  value={profile.company}
                  onChange={(event) => setProfile({ ...profile, company: event.target.value })}
                  className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="profileRegion">
                  所在地区
                </label>
                <input
                  id="profileRegion"
                  type="text"
                  placeholder="例如：Shanghai / Remote"
                  value={profile.region}
                  onChange={(event) => setProfile({ ...profile, region: event.target.value })}
                  className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              {profileMessage && (
                <p className="text-xs text-gray-500">{profileMessage}</p>
              )}
              <button
                onClick={handleSaveProfile}
                className="h-10 w-full rounded-sm bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                保存资料
              </button>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-bold">修改密码</h3>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="currentPassword">
                当前密码
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="newPassword">
                新密码
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="confirmNewPassword">
                确认新密码
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="flex h-10 w-full rounded-sm border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-gray-500">
              密码建议至少 8 位，包含大小写、数字与特殊字符。
            </p>
            {passwordMessage && (
              <p className="text-xs text-gray-500">{passwordMessage}</p>
            )}
            <button
              onClick={handleChangePassword}
              className="h-10 px-6 rounded-sm bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              更新密码
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
