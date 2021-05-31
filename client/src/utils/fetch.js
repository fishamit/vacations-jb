import jwt from "jsonwebtoken";

export const refresh = async () => {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: localStorage.getItem("refreshToken"),
    }),
  });
  if (res.status === 200) {
    const data = await res.json();
    localStorage.setItem("refreshToken", data.newRefreshToken);
    return {
      rawAccessToken: data.newAccessToken,
      decodedAccessToken: jwt.decode(data.newAccessToken),
    };
  } else {
    localStorage.removeItem("refreshToken");
    throw new Error();
  }
};

export const login = async (username, password) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await res.json();
  if (res.status === 200) {
    localStorage.setItem("refreshToken", data.refreshToken);
    return {
      rawAccessToken: data.accessToken,
      decodedAccessToken: jwt.decode(data.accessToken),
    };
  } else {
    throw data.message;
  }
};
export const register = async (fname, lname, username, password) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fname,
      lname,
      username,
      password,
    }),
  });
  const data = await res.json();
  if (res.status === 200) return;
  throw data.message;
};

export const invalidate = async refreshToken => {
  const res = await fetch("/api/auth/invalidate", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });
  const data = await res.json();
  return { status: res.status, data };
};

export const getVacations = async params => {
  const res = await fetch("/api/vacations", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: params.accessToken,
    },
  });
  const data = await res.json();
  return { status: res.status, data };
};
export const getVacationsReports = async params => {
  const res = await fetch("/api/vacations/reports", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: params.accessToken,
    },
  });
  const data = await res.json();
  return { status: res.status, data };
};

export const followVacation = async params => {
  const res = await fetch(`/api/usersvacations/${params.vid}`, {
    method: params.isFollowed ? "DELETE" : "POST",
    mode: "cors",
    headers: {
      Authorization: params.accessToken,
    },
  });

  const data = await res.json();
  return { status: res.status, data };
};

export const editVacation = async params => {
  const res = await fetch(`/api/vacations/${params.vid}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      Authorization: params.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...params.vacation,
    }),
  });
  const data = await res.json();
  return { status: res.status, data };
};

export const deleteVacation = async params => {
  console.log(params.vid);
  const res = await fetch(`/api/vacations/${params.vid}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: params.accessToken,
    },
  });
  const data = await res.json();
  return { status: res.status, data };
};

export const addVacation = async params => {
  const res = await fetch(`/api/vacations/`, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: params.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...params.vacation,
    }),
  });
  const data = await res.json();
  return { status: res.status, data };
};

export const attemptFetch = async (callback, param, dispatch) => {
  const decodedtemp = jwt.decode(param.accessToken);
  //Time remaining for access token to remain valid

  const delta = decodedtemp.exp - Math.floor(Date.now() / 1000);

  // console.log(delta);
  if (delta < 60) {
    //Less than one minute remaining - refresh token

    const payload = await refresh();
    dispatch({ type: "LOG_IN", payload });
    param.accessToken = payload.rawAccessToken;
    const res = await callback(param);
    if (res.status === 200 || res.status === 201) return res.data;
    throw new Error();
  } else {
    const res = await callback(param);
    if (res.status === 200 || res.status === 201) return res.data;
    throw new Error();
  }
};
