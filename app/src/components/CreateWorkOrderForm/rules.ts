import * as yup from "yup";

const createWorkOrderSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    tasks: yup.array().of(yup.string().required()).required("At least one task must be selected").min(1, "At least one task must be selected").default([]),
});

export default createWorkOrderSchema;
