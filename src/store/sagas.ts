import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } from "./reducer";

export const getEventList = async () => {
  try {
    const response = await axios.get("https://5025y.wiremockapi.cloud/json/1");
    return response.data;
  } catch (error) {
    throw new Error("getEventList fail");
  }
};

function* fetchEventsSaga(): Generator {
  try {
    const events = (yield call(getEventList)) as any;

    yield put(fetchEventsSuccess(events));
  } catch (error) {
    yield put(fetchEventsFailure("Failed to fetch events"));
  }
}

function* rootSaga(): Generator {
  yield takeLatest(fetchEventsRequest, fetchEventsSaga);
}

export default rootSaga;
