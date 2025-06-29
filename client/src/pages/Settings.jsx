import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SecurityTab from "../components/Tabs/SecurityTab";
import SubscriptionTab from "../components/Tabs/SubscriptionTab";
import BillingHistoryTab from "../components/Tabs/BillingHistoryTab";
import PaymentMethodsTab from "../components/Tabs/PaymentMethodsTab";
import TermsTab from "../components/Tabs/TermsTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Security");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="flex-1 p-8">
        {activeTab === "Security" && <SecurityTab />}
        {activeTab === "Subscription" && <SubscriptionTab />}
        {activeTab === "Billing History" && <BillingHistoryTab />}
        {activeTab === "Payment Methods" && <PaymentMethodsTab />}
        {activeTab === "Terms & Conditions" && <TermsTab />}
      </main>
    </div>
  );
};

export default Settings;
