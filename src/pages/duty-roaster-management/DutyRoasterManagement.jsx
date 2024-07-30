import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { Trash } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import NextButton from "../../components/micro/NextButton";
import { API_TAGS } from "../../lib/consts/API_TAGS";
import useGet from "../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const DutyRoasterManagement = () => {
  const {
    data: shiftsData,
    loading: shiftsLoading,
    error: shiftsError,
    refresh,
    invalidateCache,
    getData: getShiftsData,
  } = useGet({
    showToast: false,
  });
  const {
    data: dutyRoasterData,
    loading: dutyRoasterLoading,
    error: dutyRoasterError,
    getData: getDutyRoasterData,
  } = useGet({
    showToast: false,
  });

  useEffect(() => {
    getShiftsData(
      `${API_URL}/dutyroaster/shift?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_SHIFTS_LIST
    );
    getDutyRoasterData(
      `${API_URL}/dutyroaster?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_DUTY_ROASTER_LIST
    );
  }, []);

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Duty Roaster"}
        title={"Duty Roaster Management"}
        showButton={true}
        buttonHref={"/duty-roaster/create"}
        buttonText={"Add"}
        showExtraButton={true}
        extraButtonText={"Config"}
        extraButtonHref={"/duty-roaster/config"}
      />
      <h3 className="text-lg font-semibold">Shifts</h3>
      <Table aria-label="Duty_Roaster_List">
        <TableHeader>
          <TableColumn>S No.</TableColumn>
          <TableColumn>Shift Name</TableColumn>
          <TableColumn className="text-right">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {!shiftsLoading &&
            shiftsData?.data &&
            shiftsData?.data?.map((item, index) => (
              <TableRow key={item.uniqueId + "a"}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>
                  <NextButton
                    isIcon
                    colorScheme="error"
                    onClick={async () => {
                      try {
                        const res = await axios.delete(
                          `${API_URL}/dutyroaster/shift?propertyId=2a869149-342b-44c8-ad86-8f6465970638&uniqueId=${item.uniqueId}`
                        );
                        toast.success("Shift deleted successfully");
                        refresh(API_TAGS.GET_SHIFTS_LIST);
                      } catch (error) {
                        toast.error(
                          error?.response?.data?.error || "An error occurred"
                        );
                      }
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </NextButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <h3 className="text-lg font-semibold">Duty Roaster</h3>
      <Table aria-label="Duty_Roaster_List">
        <TableHeader>
          <TableColumn>S No.</TableColumn>
          <TableColumn>Shift Name</TableColumn>
          <TableColumn>Employee Name</TableColumn>
          <TableColumn>Responsibility</TableColumn>
          <TableColumn className="text-right">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {!dutyRoasterLoading &&
            dutyRoasterData?.map((item, index) => (
              <TableRow key={item.uniqueId + "b"}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {item?.shift?.name} ({item?.shift?.startTime}-
                  {item?.shift?.endTime})
                </TableCell>
                <TableCell>
                  {item?.employees?.map((e) => e.name).join(", ")}
                </TableCell>
                <TableCell>
                  {item?.responsibilities?.map((r) => r.name)?.join(", ")}
                </TableCell>
                <TableCell>
                  <NextButton
                    isIcon
                    colorScheme="error"
                    onClick={async () => {
                      try {
                        const res = await axios.delete(
                          `${API_URL}/dutyroaster?uniqueId=${item.uniqueId}`
                        );
                        toast.success("Duty Roaster deleted successfully");
                        refresh(API_TAGS.GET_DUTY_ROASTER_LIST);
                      } catch (error) {
                        toast.error(
                          error?.response?.data?.error || "An error occurred"
                        );
                      }
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </NextButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </FlexContainer>
  );
};

export default DutyRoasterManagement;
