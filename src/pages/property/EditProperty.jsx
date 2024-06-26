import { Checkbox, Chip, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/ApiCall";
import COUNTRIES_DATA from "../../assets/json/countries.json";
import countryData from "../../assets/json/country.json";
import timezoneData from "../../assets/json/timezone.json";
import Autocomplete from "../../components/AutoComplete";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";
import {
  BORDER_EFFECT,
  BORDER_EFFECT_ACTIVE,
  cn,
  generateDayOptions,
  generateTimeOptions,
} from "../../lib/utils";
import { validationSchema } from "../../lib/validation/property/add";

function EditProperty() {
  const [activeTab, setActiveTab] = useState(1);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    currency: "",
    property_type: "",
    email: "",
    phone: "",
    website: "",
    country_code: "",
    timezone: "",
    zip_code: "",
    state: "",
    city: "",
    address: "",
    latitude: 0,
    longitude: 0,
    min_price: 0,
    max_price: 0,
    allow_availability_autoupdate_on_confirmation: true,
    allow_availability_autoupdate_on_modification: true,
    allow_availability_autoupdate_on_cancellation: true,
    state_length: 0,
    min_stay_type: "",
    cut_off_time: "",
    cut_off_days: 0,
    description: "",
    extra_information: "",
    facilities: "",
    parking_available: false,
    couple_friendly: false,
    channexId: "",
    permissions: "",
    logo_url: "",
  });

  const location = useLocation();
  const { id } = useParams();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const timeOptions = generateTimeOptions();
  const dayOptions = generateDayOptions();
  const navigate = useNavigate();

  const fetchLocationData = async (address, setFieldValue) => {
    setFetchingLocation(true);
    try {
      const apiKey = "AIzaSyARvglBnKE3rvok7RdoGs6-1v7UEhxg4KU"; // Replace with your Google Maps API key
      const geocodeResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: address,
            key: apiKey,
          },
        }
      );

      if (geocodeResponse.data.status === "OK") {
        const result = geocodeResponse.data.results[0];
        const { address_components, geometry, formatted_address } = result;
        const location = geometry.location;

        const address = formatted_address;
        const landmark = address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name;
        const city = address_components.find((component) =>
          component.types.includes("administrative_area_level_3")
        )?.long_name;
        const state = address_components.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name;
        const country = address_components.find((component) =>
          component.types.includes("country")
        )?.short_name;
        const postalCode = address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;

        const timezoneResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/timezone/json`,
          {
            params: {
              location: `${location.lat},${location.lng}`,
              timestamp: Math.floor(Date.now() / 1000),
              key: apiKey,
            },
          }
        );

        const timezone = timezoneResponse.data.timeZoneId;

        setFieldValue("address", address);
        setFieldValue("landmark", landmark);
        setFieldValue("country_code", country);
        setFieldValue("timezone", timezone);
        setFieldValue("city", city);
        setFieldValue("state", state);
        setFieldValue("zip_code", postalCode);
        setFieldValue("latitude", location.lat);
        setFieldValue("longitude", location.lng);
        setFetchingLocation(false);
        setShowLocationForm(true);
      } else {
        toast.error("Couldn't find address");
        console.error(
          "Geocode was not successful for the following reason:",
          geocodeResponse.data.status
        );
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast.error("Error fetching location data");
    } finally {
      setFetchingLocation(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("values", values);
    let selectedValues = cloneDeep(values);
    setSubmitting(true);
    selectedValues.group_id = JSON.parse(
      localStorage.getItem("_session")
    ).groupUniqueId;
    selectedValues.permissions = selectedValues.permissions
      ? selectedValues.permissions.split(",")
      : [];
    selectedValues.facilities = selectedValues.facilities
      ? selectedValues.facilities.split(",")
      : [];
    console.log("selectedValues", selectedValues);

    const formData = new FormData();
    Object.keys(selectedValues).forEach((fieldName) => {
      formData.append(fieldName, selectedValues[fieldName]);
    });

    try {
      const response = await api("/property", selectedValues, "post");
      console.log(response);
      toast.success(response.success);
      navigate(`/property`);
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    } finally {
      setSubmitting(false);
    }
  };

  console.log(location.state.property);

  useEffect(() => {
    try {
      const { property } = location.state;
      if (property?.address) {
        setShowLocationForm(true);
      }
      if (property) {
        setInitialValues((prev) => {
          return {
            ...prev,
            ...property,
          };
        });
      }
    } catch (error) {
      console.log("error", error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Property"}
        subheading={"Add"}
        title={"Add Property"}
        showButton={false}
      />
      <div className="pb-24">
        {location?.state?.property ? (
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              setFieldValue,
              //handleSubmit,
            }) => {
              console.log("values", values);
              return (
                <Form>
                  <FlexContainer variant="column-start" gap="xl">
                    <FlexContainer
                      variant="row-start"
                      className="overflow-x-auto w-full"
                    >
                      <Tab
                        title="Details"
                        isActiveTab={activeTab === 1}
                        onClick={() => handleTabClick(1)}
                      />
                      <Tab
                        title="Content"
                        isActiveTab={activeTab === 2}
                        onClick={() => handleTabClick(2)}
                      />

                      <Tab
                        title="Settings"
                        isActiveTab={activeTab === 3}
                        onClick={() => handleTabClick(3)}
                      />
                      <Tab
                        title="Photos"
                        isActiveTab={activeTab === 4}
                        onClick={() => handleTabClick(4)}
                      />
                      <Tab
                        title="Policies"
                        isActiveTab={activeTab === 5}
                        onClick={() => handleTabClick(5)}
                      />
                      <Tab
                        title="Tax set"
                        isActiveTab={activeTab === 6}
                        onClick={() => handleTabClick(6)}
                      />
                      <Tab
                        title="Taxes"
                        isActiveTab={activeTab === 7}
                        onClick={() => handleTabClick(7)}
                      />
                    </FlexContainer>
                    <div className={cn(activeTab !== 1 && "hidden")}>
                      <FlexContainer variant="column-start" gap="xl">
                        <FlexContainer variant="column-start" isContainer>
                          <h2 className="relative text-2xl font-semibold">
                            Basic Details
                            {/* <span className="absolute block h-5 w-[2.5px] rounded-3xl bg-indigo-400 left-0.5 top-1.5"></span> */}
                          </h2>

                          <GridContainer gap="xl">
                            <Input
                              type="text"
                              name="title"
                              label="Property Name"
                              labelPlacement="outside"
                              placeholder="Enter your property name"
                              radius="sm"
                              classNames={{
                                label: "font-medium text-zinc-100",
                                inputWrapper: "border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("title", e.target.value);
                              }}
                              value={values.title || ""}
                              isInvalid={errors.title && touched.title}
                              color={errors.title && touched.title && "danger"}
                              errorMessage={
                                errors.title && touched.title && errors.title
                              }
                            />
                            <Autocomplete
                              label={"Currency"}
                              placeholder={"Select an option"}
                              name={"currency"}
                              showClearButton={true}
                              options={COUNTRIES_DATA.map((country) => ({
                                value: country.currency_code,
                                name: country.name + " - " + country.currency,
                              }))}
                              setSelectedOption={(option) => {
                                setFieldValue("currency", option?.value);
                              }}
                              selectedOption={values.currency}
                            />
                            {/* <Select
                              label="Currency"
                              labelPlacement="outside"
                              name="currency"
                              placeholder="Select an option"
                              radius="sm"
                              classNames={{
                                label: "font-medium text-zinc-900",
                                trigger: "border shadow-none",
                              }}
                              items={countryData}
                              onChange={(e) => {
                                setFieldValue("currency", e.target.value);
                              }}
                              selectedKeys={[values.currency || ""]}
                              isInvalid={errors.currency && touched.currency}
                              color={
                                errors.currency && touched.currency && "danger"
                              }
                              errorMessage={
                                errors.currency &&
                                touched.currency &&
                                errors.currency
                              }
                            >
                              {(currency) => (
                                <SelectItem key={currency.currency_code}>
                                  {currency.currency}
                                </SelectItem>
                              )}
                            </Select> */}

                            <Select
                              label="Property Type"
                              labelPlacement="outside"
                              name="property_type"
                              placeholder="Select an option"
                              radius="sm"
                              classNames={{
                                label: "font-medium text-zinc-900",
                                trigger: "border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("property_type", e.target.value);
                              }}
                              selectedKeys={[values.property_type || ""]}
                              isInvalid={
                                errors.property_type && touched.property_type
                              }
                              color={
                                errors.property_type &&
                                touched.property_type &&
                                "danger"
                              }
                              errorMessage={
                                errors.property_type &&
                                touched.property_type &&
                                errors.property_type
                              }
                            >
                              <SelectItem key="hotel" value="hotel">
                                Hotel
                              </SelectItem>
                            </Select>
                          </GridContainer>
                        </FlexContainer>
                        <FlexContainer variant="column-start" isContainer>
                          <h2 className="relative text-2xl font-semibold">
                            Contact Details
                            {/* <span className="absolute block h-5 w-[2.5px] rounded-3xl bg-indigo-400 left-0.5 top-1.5"></span> */}
                          </h2>
                          <GridContainer gap="xl">
                            <Input
                              type="email"
                              name="email"
                              label="Email"
                              labelPlacement="outside"
                              placeholder="Enter your email"
                              radius="sm"
                              classNames={{
                                label: "font-medium text-zinc-100",
                                inputWrapper: "border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("email", e.target.value);
                              }}
                              value={values.email || ""}
                              isInvalid={errors.email && touched.email}
                              color={errors.email && touched.email && "danger"}
                              errorMessage={
                                errors.email && touched.email && errors.email
                              }
                            />

                            <Input
                              type="text"
                              name="phone"
                              label="Phone Number"
                              labelPlacement="outside"
                              placeholder="Enter your phone number"
                              radius="sm"
                              classNames={{
                                label: "font-medium text-zinc-100",
                                inputWrapper: "border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("phone", e.target.value);
                              }}
                              value={values.phone || ""}
                              isInvalid={errors.phone && touched.phone}
                              color={errors.phone && touched.phone && "danger"}
                              errorMessage={
                                errors.phone && touched.phone && errors.phone
                              }
                            />

                            <Input
                              type="text"
                              name="website"
                              label="Website"
                              labelPlacement="outside"
                              placeholder="Enter your website"
                              radius="sm"
                              classNames={{
                                label: "font-medium text-zinc-100",
                                inputWrapper: "border shadow-none",
                              }}
                              value={values.website || ""}
                              onChange={(e) => {
                                setFieldValue("website", e.target.value);
                              }}
                            />
                          </GridContainer>
                        </FlexContainer>
                        <FlexContainer variant="column-start" isContainer>
                          <h2 className="relative text-2xl font-semibold">
                            Location Details
                            {/* <span className="absolute block h-5 w-[2.5px] rounded-3xl bg-indigo-400 left-0.5 top-1.5"></span> */}
                          </h2>
                          <div className="md:grid md:grid-cols-3 gap-[20px]">
                            <div className="relative">
                              <Input
                                type="text"
                                name="address"
                                label="Location"
                                labelPlacement="outside"
                                placeholder="Enter address"
                                className="relative"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-100",
                                  inputWrapper: "border shadow-none",
                                }}
                                onChange={(e) => {
                                  setFieldValue("address", e.target.value);
                                }}
                                value={values.address || ""}
                                isInvalid={errors.address && touched.address}
                                color={
                                  errors.address && touched.address && "danger"
                                }
                                errorMessage={errors.address && touched.address}
                                endContent={
                                  fetchingLocation ? (
                                    <Chip
                                      classNames={{
                                        base: "border rounded-md border-gray-300 bg-white p-1.5 text-xs font-medium hover:bg-zinc-50 cursor-pointer",
                                      }}
                                    >
                                      Fetching...
                                    </Chip>
                                  ) : (
                                    <Chip
                                      onClick={() => {
                                        fetchLocationData(
                                          values.address,
                                          setFieldValue
                                        );
                                      }}
                                      classNames={{
                                        base: "border rounded-md border-gray-300 bg-white p-1.5 text-xs font-medium hover:bg-zinc-50 cursor-pointer",
                                      }}
                                    >
                                      Fetch
                                    </Chip>
                                  )
                                }
                              />
                              <div className="absolute -top-3 right-0 flex items-center justify-end">
                                <Chip
                                  classNames={{
                                    base: "border rounded-md border-gray-300 bg-white p-1.5 text-xs font-medium hover:bg-zinc-50",
                                  }}
                                >
                                  Live location
                                </Chip>
                              </div>
                            </div>
                            {showLocationForm && (
                              <>
                                <Input
                                  type="text"
                                  label="Landmark"
                                  labelPlacement="outside"
                                  placeholder="Enter landmark"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-100",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  value={values.landmark || ""}
                                />
                                <Input
                                  type="text"
                                  label="Country Code"
                                  name="country_code"
                                  labelPlacement="outside"
                                  placeholder="Enter country code"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-100",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "country_code",
                                      e.target.value
                                    );
                                  }}
                                  value={values.country_code || ""}
                                  isInvalid={
                                    errors.country_code && touched.country_code
                                  }
                                  color={
                                    errors.country_code &&
                                    touched.country_code &&
                                    "danger"
                                  }
                                  errorMessage={
                                    errors.country_code && touched.country_code
                                  }
                                />

                                <Input
                                  label="Timezone"
                                  labelPlacement="outside"
                                  name="timezone"
                                  placeholder="Enter Timezone"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-100",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue("timezone", e.target.value);
                                  }}
                                  value={values.timezone || ""}
                                  isInvalid={
                                    errors.timezone && touched.timezone
                                  }
                                  color={
                                    errors.timezone &&
                                    touched.timezone &&
                                    "danger"
                                  }
                                  errorMessage={
                                    errors.timezone && touched.timezone
                                  }
                                />

                                <Input
                                  type="text"
                                  label="City"
                                  name="city"
                                  labelPlacement="outside"
                                  placeholder="Enter city"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-100",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue("city", e.target.value);
                                  }}
                                  value={values.city || ""}
                                />
                                <Input
                                  type="text"
                                  label="State"
                                  name="state"
                                  labelPlacement="outside"
                                  placeholder="Enter state"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-100",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue("state", e.target.value);
                                  }}
                                  value={values.state || ""}
                                />
                                <Input
                                  type="text"
                                  label="Zip Code"
                                  name="zip_code"
                                  labelPlacement="outside"
                                  placeholder="Enter zip code"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-100",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue("zip_code", e.target.value);
                                  }}
                                  value={values.zip_code || ""}
                                />

                                <Input
                                  type="text"
                                  label="Latitude"
                                  name="latitude"
                                  labelPlacement="outside"
                                  placeholder="Enter latitude"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-100",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue("latitude", e.target.value);
                                  }}
                                  value={values.latitude || ""}
                                />
                                <Input
                                  type="text"
                                  label="Longitude"
                                  name="longitude"
                                  labelPlacement="outside"
                                  placeholder="Enter longitude"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-100",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue("longitude", e.target.value);
                                  }}
                                  value={values.longitude || ""}
                                />
                              </>
                            )}
                          </div>
                        </FlexContainer>
                      </FlexContainer>
                    </div>
                    <div className={cn(activeTab !== 2 && "hidden")}>
                      <FlexContainer variant="column-start" gap="xl">
                        <FlexContainer variant="column-start" isContainer>
                          <h2 className="relative text-2xl font-semibold">
                            Price Setting
                          </h2>
                          <GridContainer gap="xl">
                            <Input
                              type="text"
                              label="Min Price"
                              name="min_price"
                              labelPlacement="outside"
                              placeholder="Enter min price"
                              radius="sm"
                              classNames={{
                                label: "font-medium text-zinc-100",
                                inputWrapper: "border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("min_price", e.target.value);
                              }}
                              value={values.min_price || ""}
                            />
                            <Input
                              type="text"
                              label="Max Price"
                              name="max_price"
                              labelPlacement="outside"
                              placeholder="Enter max price"
                              radius="sm"
                              classNames={{
                                label: "font-medium text-zinc-100",
                                inputWrapper: "border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("max_price", e.target.value);
                              }}
                              value={values.max_price || ""}
                            />
                          </GridContainer>
                          <p className="py-1 text-sm text-zinc-500">
                            Here you can manage the minimum and maximum price
                            for the property
                          </p>
                        </FlexContainer>
                        <FlexContainer variant="column-start" isContainer>
                          <h2 className="relative text-2xl font-semibold">
                            Automatic Availability Update Settings
                          </h2>
                          <p className="py-1 text-sm text-zinc-500 max-w-2xl">
                            Here you will decide what should happen when a New,
                            Modified or Cancelled booking happens. If the
                            availability will change automatically or the PMS
                            will control these changes.
                          </p>
                          <GridContainer gap="xl">
                            <div className="relative flex flex-col justify-start *:w-full">
                              <Checkbox
                                defaultSelected={
                                  values.allow_availability_autoupdate_on_confirmation
                                }
                                isDisabled
                                onChange={(e) => {
                                  setFieldValue(
                                    "allow_availability_autoupdate_on_confirmation",
                                    e.target.value
                                  );
                                }}
                              >
                                New Bookings
                              </Checkbox>
                              <p className="mt-1 text-xs text-default-500">
                                If selected, for any new bookings created the
                                availability will be negatively adjusted
                              </p>
                            </div>
                            <FlexContainer variant="column-start" gap="none">
                              <Checkbox
                                defaultSelected={
                                  values.allow_availability_autoupdate_on_modification
                                }
                                isDisabled
                                onChange={(e) => {
                                  setFieldValue(
                                    "allow_availability_autoupdate_on_modification",
                                    e.target.value
                                  );
                                }}
                              >
                                Modified Bookings
                              </Checkbox>
                              <p className="mt-1 text-xs text-default-500">
                                If selected, for any modified bookings created
                                the availability will be automatically adjusted
                              </p>
                            </FlexContainer>
                            <FlexContainer variant="column-start" gap="none">
                              <Checkbox
                                defaultSelected={
                                  values.allow_availability_autoupdate_on_cancellation
                                }
                                isDisabled
                                onChange={(e) => {
                                  setFieldValue(
                                    "allow_availability_autoupdate_on_cancellation",
                                    e.target.value
                                  );
                                }}
                              >
                                Cancelled Bookings
                              </Checkbox>
                              <p className="mt-1 text-xs text-default-500">
                                If selected, for any cancelled bookings the
                                availability will be positively adjusted
                              </p>
                            </FlexContainer>
                          </GridContainer>
                        </FlexContainer>
                        <FlexContainer variant="column-start" isContainer>
                          <h2 className="relative text-2xl font-semibold">
                            Inventory Days
                          </h2>
                          <GridContainer gap="xl">
                            <div className="flex flex-col items-start justify-center gap-1.5 *:w-full">
                              <Input
                                type="text"
                                name="state_length"
                                label="Inventory Days"
                                labelPlacement="outside"
                                placeholder="Enter inventory days"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-100",
                                  inputWrapper: "border shadow-none",
                                }}
                                onChange={(e) => {
                                  setFieldValue("state_length", e.target.value);
                                }}
                                value={values.state_length || ""}
                                isInvalid={
                                  errors.state_length && touched.state_length
                                }
                                color={
                                  errors.state_length &&
                                  touched.state_length &&
                                  "danger"
                                }
                                errorMessage={
                                  errors.state_length && touched.state_length
                                }
                              />
                              <p className="text-xs text-default-500">
                                Set the length of the inventory table in number
                                of days. Min: 100, Max: 730
                              </p>
                            </div>
                          </GridContainer>
                        </FlexContainer>

                        <FlexContainer variant="column-start" isContainer>
                          <h2 className="relative text-2xl font-semibold">
                            Minimum Stay Settings
                          </h2>
                          <p className="py-1 text-sm text-zinc-500 max-w-2xl">
                            Here you can simplify the user experience for your
                            user by using only one kind of minimum stay. <br />
                            Note: Changing these settings will remove all values
                            from the unused min stay type. Please full sync from
                            PMS after any changes here and check.
                          </p>
                          <GridContainer gap="xl">
                            <Select
                              label="Minimum Stay Settings"
                              labelPlacement="outside"
                              name="min_stay_type"
                              placeholder="Select an option"
                              color="default"
                              radius="sm"
                              classNames={{
                                label: "font-medium",
                                trigger: "border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("min_stay_type", e.target.value);
                              }}
                              selectedKeys={[values.min_stay_type || ""]}
                            >
                              <SelectItem key={"both"} value="both">
                                Both
                              </SelectItem>
                              <SelectItem key={"arrival"} value="arrival">
                                Min Stay Arrival
                              </SelectItem>
                              <SelectItem key={"through"} value="through">
                                Min Stay Through
                              </SelectItem>
                            </Select>
                          </GridContainer>
                        </FlexContainer>

                        <FlexContainer variant="column-start" isContainer>
                          <h2 className="relative text-2xl font-semibold">
                            Cut off time
                          </h2>
                          <p className="py-1 text-sm text-zinc-500 max-w-2xl">
                            Control when to stop sales for same day reservations
                            <br /> We will use the property timezone, when the
                            time is reached all availability will be 0 for the
                            current day
                          </p>
                          <GridContainer>
                            <Select
                              label="Cut off time"
                              name="cut_off_time"
                              labelPlacement="outside"
                              placeholder="Select an option"
                              color="default"
                              radius="sm"
                              classNames={{
                                label: "font-medium",
                                trigger: " border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("cut_off_time", e.target.value);
                              }}
                              selectedKeys={[values.cut_off_time || ""]}
                            >
                              {timeOptions.map((time, index) => (
                                <SelectItem key={index} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </Select>
                            <Select
                              label="Cut Off Days"
                              name="cut_off_days"
                              labelPlacement="outside"
                              placeholder="Select an option"
                              color="default"
                              radius="sm"
                              classNames={{
                                label: "font-medium",
                                trigger: " border shadow-none",
                              }}
                              onChange={(e) => {
                                setFieldValue("cut_off_days", e.target.value);
                              }}
                              selectedKeys={[values.cut_off_days || ""]}
                            >
                              {dayOptions.map((day, index) => (
                                <SelectItem key={index} value={day.value}>
                                  {day.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </GridContainer>
                        </FlexContainer>
                      </FlexContainer>
                    </div>
                    <FlexContainer
                      variant="row-center"
                      className={
                        "p-5 fixed bottom-0 right-0 z-50 backdrop-blur-md"
                      }
                    >
                      <NextButton
                        type="submit"
                        name="submit"
                        loading={isSubmitting}
                        colorScheme="primary"
                        className="rounded-3xl text-sm px-6 py-3 h-auto border-none"
                      >
                        {isSubmitting
                          ? "Creating Property..."
                          : "Create Property"}
                      </NextButton>
                    </FlexContainer>
                  </FlexContainer>

                  {/* <div className="flex gap-[24px] bg-[#F8F8F8] rounded-[12px] shadow-sm mt-5 p-4">
                  <div>
                    <button
                      type="submit"
                      name="submit"
                      className={`py-[10px] px-[60px] text-center text-white w-full rounded-[12px] text-[25px] ${
                        isSubmitting ? "bg-gray-300" : "bg-[#1C1C20]"
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div> */}
                </Form>
              );
            }}
          </Formik>
        ) : null}
      </div>
    </FlexContainer>
  );
}

export default EditProperty;
