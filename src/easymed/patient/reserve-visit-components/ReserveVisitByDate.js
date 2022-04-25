import React from "react";
import SelectOptionField from "./SelectOptionField";
import { apiEndpoints } from "./backendApi";
import moment from "moment";

export default function ReserveVisitByDate({
  values,
  valueChangers,
  lists,
}) {
  const updateDate = (date) => {
    valueChangers.date(date);
    valueChangers.specialization(null);
    valueChangers.api(apiEndpoints.specialization);
  };

  const updateSpecialization = (spec) => {
    valueChangers.specialization(spec);
    valueChangers.doctor(null);
    valueChangers.term(null);
    if (spec) {
      valueChangers.api(
        `${apiEndpoints.doctorWithSpec}?specialization=${spec}`
      );
    } else {
      valueChangers.api(apiEndpoints.specialization);
    }
  };

  const updateDoctor = (doctor) => {
    valueChangers.doctor(doctor);
    valueChangers.term(null);
    if (doctor) {
      valueChangers.api(
        `${apiEndpoints.doctorFreeTerms}?doctorId=${
          doctor.id
        }&visitDateTime=${moment(values.date, "DD/MM/YYYY").format(
          "YYYY-MM-DD"
        )}`
      );
    } else {
      valueChangers.api(
        `${apiEndpoints.doctorWithSpec}?specialization=${values.specialization}`
      );
    }
  };

  return (
    <>
      <SelectOptionField
        type="date"
        label="Select date"
        value={values.date}
        valueChanger={updateDate}
        displayCondition={true}
      />

      <SelectOptionField
        type="specialization"
        label="Select specialization"
        value={values.specialization}
        valueChanger={updateSpecialization}
        options={lists.specializations}
        getOptionLabel={(option) => option.toString()}
        displayCondition={values.date}
      />

      <SelectOptionField
        type="doctor"
        label="Select doctor"
        value={values.doctor}
        valueChanger={updateDoctor}
        options={lists.doctors}
        getOptionLabel={(option) =>
          `${option.firstName} ${option.lastName} , lok: ${option.officeLocation}`
        }
        displayCondition={values.date && values.specialization}
      />

      <SelectOptionField
        type="term"
        label="Select term"
        value={values.terms}
        valueChanger={valueChangers.term}
        options={lists.terms}
        getOptionLabel={(option) =>
          `${moment(option.visitDateTime, "YYYY-MM-DDTHH:mm:ss.SSS").format('d MMMM YYYY, h:mma')} (${option.dayOfWeek})`
        }
        displayCondition={values.date && values.specialization && values.doctor}
      />
    </>
  );
}
