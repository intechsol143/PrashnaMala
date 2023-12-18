import React, {createRef} from 'react';
const navigationRef = createRef();
const navigate = name => {
  navigationRef.current?.navigate(name);
};
const navigate2 = (name, par) => {
  navigationRef.current?.navigate(name, par);
};
const navigate3 = () => {
  navigationRef.current?.goBack();
};
const push = name => {
  navigationRef.current?.push(name);
};
export {push, navigate, navigate2,navigate3 ,navigationRef};
