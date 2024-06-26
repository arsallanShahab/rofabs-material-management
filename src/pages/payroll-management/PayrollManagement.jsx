import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import NextButton from "../../components/micro/NextButton";

const PAYMENT_DATA = [
  {
    id: 1,
    name: "John Doe",
    paymentHistory: [
      {
        id: 1,
        paymentDate: "01-01-2021",
        amount: 10000,
        status: "Paid",
      },
    ],
  },
  {
    id: 2,
    name: "Alice",
    paymentHistory: [
      {
        id: 1,
        paymentDate: "01-01-2021",
        amount: 10000,
        status: "Paid",
      },
    ],
  },
];

const PayrollManagement = () => {
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Payroll"}
        title={"Payroll Management"}
        showButton={true}
        buttonHref={"/payroll/create"}
        buttonText={"Create Payment"}
      />
      <Table aria-label="Inward List">
        <TableHeader>
          <TableColumn>EMP ID</TableColumn>
          <TableColumn>Employee Name</TableColumn>
          <TableColumn>Payment History</TableColumn>
        </TableHeader>
        <TableBody>
          {PAYMENT_DATA.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>
                <Table>
                  <TableHeader>
                    <TableColumn>Payment ID</TableColumn>
                    <TableColumn>Payment Date</TableColumn>
                    <TableColumn>Amount</TableColumn>
                    <TableColumn>Status</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {employee.paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>{payment.paymentDate}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FlexContainer>
  );
};

export default PayrollManagement;
