/* Handling Errors through Toastr */

import toastr from "toastr";

// Customize default toastr options
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

export const successToaster = (title, desc) => {
  return toastr.success(desc, title);
};
export const errorToaster = (title, desc) => {
  return toastr.error(desc, title);
};

export const warnToaster = (title, desc) => {
  return toastr.warning(desc, title);
};

export const infoToaster = (title, desc) => {
  return toastr.info(desc, title);
};
