import { Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { API_TAGS } from "../../../lib/consts/API_TAGS";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const ConsumptionReportKitchen = () => {
  const [selectedTime, setSelectedTime] = useState("monthly");

  const {
    data: consumptionReportData,
    error: consumptionReportError,
    loading: consumptionReportLoading,
    refresh,
    invalidateCache,
    getData: getConsumptionReportData,
  } = useGet({ showToast: false });

  console.log(consumptionReportData, "consumption report data");

  useEffect(() => {
    getConsumptionReportData(
      `${API_URL}/getKitchenUtilizationEntry/graph/detailed?propertyId=2a869149-342b-44c8-ad86-8f6465970638&timeFrame=daily`,
      API_TAGS.GET_KITCEHN_CONSUMPTION_REPORT
    );
  }, []);

  useEffect(() => {
    //date range in iso format 8601 like weely monthly and yeraly
    // if (selectedTime === "weekly") {
    //   const startDate = new Date();
    //   startDate.setDate(startDate.getDate() - 7);
    //   const endDate = new Date();
    //   const startDateISO = startDate.toISOString().split("T")[0];
    //   const endDateISO = endDate.toISOString().split("T")[0];
    //   getConsumptionReportData(
    //     `${API_URL}/getKitchenUtilizationEntry/graph/detailed?propertyId=2a869149-342b-44c8-ad86-8f6465970638&utilizationDateStart=${startDateISO}&utilizationDateEnd=${endDateISO}`
    //   );
    // } else if (selectedTime === "monthly") {
    //   const startDate = new Date();
    //   startDate.setMonth(startDate.getMonth() - 1);
    //   const endDate = new Date();
    //   const startDateISO = startDate.toISOString().split("T")[0];
    //   const endDateISO = endDate.toISOString().split("T")[0];
    //   getConsumptionReportData(
    //     `${API_URL}/getKitchenUtilizationEntry/graph/detailed?propertyId=2a869149-342b-44c8-ad86-8f6465970638&utilizationDateStart=${startDateISO}&utilizationDateEnd=${endDateISO}`
    //   );
    // } else if (selectedTime === "yearly") {
    //   const startDate = new Date();
    //   startDate.setFullYear(startDate.getFullYear() - 1);
    //   const endDate = new Date();
    //   const startDateISO = startDate.toISOString().split("T")[0];
    //   const endDateISO = endDate.toISOString().split("T")[0];
    //   getConsumptionReportData(
    //     `${API_URL}/getKitchenUtilizationEntry/graph/detailed?propertyId=2a869149-342b-44c8-ad86-8f6465970638&utilizationDateStart=${startDateISO}&utilizationDateEnd=${endDateISO}`
    //   );
    // }
    // getConsumptionReportData(
    //   `${API_URL}/getKitchenUtilizationEntry/graph/detailed?propertyId=2a869149-342b-44c8-ad86-8f6465970638&timeFrame=${selectedTime}`
    // );
    getConsumptionReportData(
      `${API_URL}/getKitchenUtilizationEntry/graph/detailed?propertyId=2a869149-342b-44c8-ad86-8f6465970638&timeFrame=${selectedTime}`
    );
    // refresh(API_TAGS.GET_KITCEHN_CONSUMPTION_REPORT);
  }, [selectedTime]);

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Consumption Report"}
        subheading={"Kitchen"}
        title={"Consumption Report Management"}
      />
      <div className="grid grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <FlexContainer variant="row-between" className={"w-full"}>
              <FlexContainer variant="column-start">
                <CardTitle>
                  Line Chart - Total Products Utilized / Monthly
                </CardTitle>
                <CardDescription>
                  {consumptionReportData?.data[0]?.period} to{" "}
                  {
                    consumptionReportData?.data[
                      consumptionReportData?.data.length - 1
                    ]?.period
                  }
                </CardDescription>
              </FlexContainer>
              <Select
                // name="start_time"
                // label="Start Time"
                labelPlacement="outside"
                placeholder="Select Start Time"
                radius="sm"
                classNames={{
                  label: "font-medium text-zinc-100",
                  trigger: "border shadow-none w-32",
                  base: "w-auto",
                }}
                items={[
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                  { value: "monthly", label: "Monthly" },
                ]}
                selectedKeys={[selectedTime]}
                onChange={(value) => setSelectedTime(value.target.value)}
              >
                {(item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                )}
              </Select>
            </FlexContainer>
          </CardHeader>
          {!consumptionReportLoading && consumptionReportData && (
            <CardContent>
              <ChartContainer
                config={{
                  totalNoOfProducts: {
                    label: "Total Products Utilized ",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <AreaChart
                  accessibilityLayer
                  data={consumptionReportData?.data}
                  margin={{
                    left: 12,
                    right: 12,
                    bottom: 0,
                  }}
                >
                  {/* <CartesianGrid vertical={false} /> */}
                  <XAxis
                    dataKey="period"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={5}
                    tickFormatter={(value) => {
                      return dayjs(value.slice(0, 10)).format("DD MMM");
                    }}
                  />
                  <YAxis
                    // tickLine={false}
                    // axisLine={false}
                    tickMargin={5}
                    tickFormatter={(value) => {
                      return value;
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  {/* <Line
                    dataKey="totalNoOfProducts"
                    type="natural"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={true}
                  /> */}
                  <Area
                    dataKey="totalNoOfProducts"
                    type="natural"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.5}
                    stroke="hsl(var(--chart-1))"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          )}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Line Chart - Top Products Utilized in last month
            </CardTitle>
            <CardDescription>
              {
                consumptionReportData?.data[
                  consumptionReportData?.data?.length - 1
                ]?.period
              }{" "}
            </CardDescription>
          </CardHeader>
          {!consumptionReportLoading && consumptionReportData && (
            <CardContent>
              <ChartContainer
                config={{
                  name: {
                    label: "Utilized: ",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="name" hideLabel />}
                  />
                  <Pie
                    data={
                      consumptionReportData?.data[
                        consumptionReportData?.data.length - 1
                      ]?.topProducts
                    }
                    dataKey="noOfProducts"
                    fill="#82ca9d"
                  >
                    <LabelList
                      dataKey="name"
                      className="fill-background"
                      stroke="none"
                      fontSize={12}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          )}
        </Card>
      </div>
    </FlexContainer>
  );
};

export default ConsumptionReportKitchen;
