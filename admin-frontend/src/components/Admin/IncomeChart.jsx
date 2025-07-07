import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Ui/tabs";
import { Card, CardContent } from "../Ui/card";

const chartData = {
  daily: [
    { date: "Mon", income: 1200 },
    { date: "Tue", income: 1500 },
    { date: "Wed", income: 1800 },
    { date: "Thu", income: 1300 },
    { date: "Fri", income: 1900 },
    { date: "Sat", income: 2500 },
    { date: "Sun", income: 2100 },
  ],
  weekly: [
    { date: "Week 1", income: 12000 },
    { date: "Week 2", income: 15000 },
    { date: "Week 3", income: 18000 },
    { date: "Week 4", income: 13000 },
  ],
  monthly: [
    { date: "Jan", income: 45000 },
    { date: "Feb", income: 47000 },
    { date: "Mar", income: 52000 },
    { date: "Apr", income: 49000 },
  ],
  yearly: [
    { date: "2021", income: 520000 },
    { date: "2022", income: 590000 },
    { date: "2023", income: 640000 },
    { date: "2024", income: 710000 },
  ],
};

const IncomeChart = () => {
  return (
    <Card>
      <CardContent className="py-4">
        <h2 className="text-lg font-bold mb-4">Income Overview</h2>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="flex gap-4 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          {Object.keys(chartData).map((key) => (
            <TabsContent value={key} key={key}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData[key]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IncomeChart;
