exports.fetchFolder = async (folderId) => {
  try {
    const res = await api.get(`/folder/${folderId}`);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      data: error?.response?.data?.msg || "Unable to fetch folder",
    };
  }
};
