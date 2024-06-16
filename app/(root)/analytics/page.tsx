"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React from "react";

// AnalyticsCard Component
interface AnalyticsCardProps {
  title: string;
  count: string;
}

const Cdata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, count }) => {
  return (
    <div className="flex flex-col gap-3 py-4 px-8 border rounded-md">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-md text-gray-600">{count}</p>
      </div>
    </div>
  );
};

// Page Component
const Page = () => {
  const [data, setData] = useState([
    { title: "Posts", count: "0" },
    { title: "Upvotes", count: "0" },
    { title: "Comments", count: "0" },
    { title: "Avg. Upvotes", count: "0" },
    { title: "Avg. Comments", count: "0" },
  ]);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {data.map((item, index) => (
          <AnalyticsCard key={index} title={item.title} count={item.count} />
        ))}
      </div>
      <div>
        <p className="text-xl font-bold mb-4">Posts Upvotes</p>
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={Cdata}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold mb-4">Posts Submitted</p>
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={Cdata}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Page;
