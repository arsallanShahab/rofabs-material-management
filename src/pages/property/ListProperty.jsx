import { Avatar, Image } from "@nextui-org/react";
import { Pencil, Trash } from "lucide-react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/ApiCall";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import Transition from "../../components/layout/Transition";
import Loader from "../../components/micro/Loader";
import NextButton from "../../components/micro/NextButton";

const ListProperty = () => {
  const user = JSON.parse(localStorage.getItem("_session"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async function () {
      try {
        const response = await api(
          `/property/${user?.groupUniqueId}`,
          {},
          "get"
        );
        setProperties(response.data || []);
      } catch (err) {
        console.log(err);
        toast.error(
          err?.error?.message || err?.error?.name || "Failed to load properties"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);
  return (
    <FlexContainer variant="column-start" gap="2xl">
      <ActionArea
        heading={"Property"}
        subheading={"List"}
        title={"List Property"}
        showButton={true}
        buttonText={"Add Property"}
        buttonHref={"/property/add"}
      />
      {loading && <Loader text="Loading properties..." />}
      {!loading && properties.length === 0 && (
        <FlexContainer
          variant="row-center"
          className="text-center text-sm font-medium"
        >
          You have not added any property yet.
        </FlexContainer>
      )}
      {!loading &&
        properties.length > 0 &&
        properties.map((property) => (
          <Property key={property.uniqueId} property={property} />
        ))}
    </FlexContainer>
  );
};

const Property = ({ property }) => {
  const user = JSON.parse(localStorage.getItem("_session"));
  const [isDeleting, setIsDeleting] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await api(
        `/property/${property.uniqueId}`,
        {},
        "delete"
      );
      toast.success(response.success);
      setReload(!reload);
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <FlexContainer
      variant="row-between"
      className={"rounded-xl border p-3 w-full"}
    >
      <FlexContainer variant="column-start" wrap="wrap" className={"flex-1"}>
        <FlexContainer variant="column-start" gap="none">
          <FlexContainer>
            <h3 className="text-2xl font-semibold">{property.title}</h3>
            <p className="text-sm font-medium capitalize px-3 py-1 border-2 rounded-xl">
              {property.property_type}
            </p>
          </FlexContainer>
          <p className="text-sm font-medium">Time Zone: {property.timezone}</p>
        </FlexContainer>
        <img
          src={property?.image || "https://via.placeholder.com/500"}
          alt={property.title}
          className="h-52 w-full object-cover rounded-xl object-center max-w-xl"
        />
      </FlexContainer>
      <FlexContainer variant="row">
        <NextButton
          isIcon
          onClick={() => {
            navigate(`/property/edit/${property.uniqueId}`, {
              state: { property },
            });
          }}
        >
          <Pencil className="w-4 h4" />
        </NextButton>
        <NextButton
          colorScheme="error"
          isIcon
          loading={isDeleting}
          onClick={() => {
            handleDelete();
          }}
        >
          <Trash className="w-4 h-4" />
        </NextButton>
      </FlexContainer>
    </FlexContainer>
  );
};

Property.propTypes = {
  property: PropTypes.object.isRequired,
};

export default ListProperty;
