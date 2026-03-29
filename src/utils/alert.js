import Swal from "sweetalert2";

export const confirmDelete = async () => {
  return await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    confirmButtonColor: "#6366f1",
    cancelButtonColor: "#ef4444",
  });
};

export const successAlert = (msg) =>
  Swal.fire("Success", msg, "success");

export const errorAlert = (msg) =>
  Swal.fire("Error", msg, "error");