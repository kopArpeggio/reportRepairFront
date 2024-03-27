import axios from "axios";
// import { sweetAlertError } from "../swal2/swal2";

const prefix = "repair";

const CREATE_REPORT_API = `${prefix}/create-report-repair`;
const UPDATE_REPORT_REPAIR_BY_ID_API = `${prefix}/update-report-repair`;
const GET_ALL_REPORT_REPAIR_API = `${prefix}/get-all-report-repair`;
const DELETE_REPORT_REPAIR_API = `${prefix}/delete-report-repair`;

export const createReport = async (body) => {
  try {
    const form = new FormData();
    form.append("picture", body?.picture);
    const { status } = await axios.post(
      `${CREATE_REPORT_API}`,
      { ...body, form },
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${body?.picture?._boundary}`,
        },
      }
    );

    if (status === 201) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    // FailALert("เกิดข้อผิดพลาด");
    console.log(err);

    // sweetAlertError(err);
  }
};

export const getAllReport = async () => {
  try {
    // console.log(process?.env?.REACT_APP_UPLOAD_HOST);
    const { data, status } = await axios.get(`${GET_ALL_REPORT_REPAIR_API}`);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    // sweetAlertError(err);
  }
};

export const deleteReportById = async (select) => {
  try {
    const { status } = await axios.delete(
      `${DELETE_REPORT_REPAIR_API}/${select}`
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;

    //   sweetAlertError(err);
  }
};

export const updateReportRepairById = async (body) => {
  try {
    console.log(body);
    const form = new FormData();
    form.append("picture", body?.picture);
    const { status } = await axios.put(
      `${UPDATE_REPORT_REPAIR_BY_ID_API}/${body?.id}`,
      { ...body, form },
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${body?.picture?._boundary}`,
        },
      }
    );

    if (status === 200) {
      return true;
    }
  } catch (error) {
    const err = error?.response?.data?.error;
    console.log(err);
    // FailALert("อัพเดทไม่สำเร็จเกิดข้อผิดพลาด");

    // sweetAlertError(err);
  }
};
