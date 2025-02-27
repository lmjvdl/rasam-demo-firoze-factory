
const allQueryKeys = {
    login: ["AUTH", "LOGIN"],
    refreshToken: ["AUTH", "REFRESH TOKEN"],
    adminPanel: {
      company: {
        list: ["ADMIN_PANEL", "COMPANY", "VIEW"],
        delete: ["ADMIN_PANEL", "COMPANY", "DELETE"],
        update: ["ADMIN_PANEL", "COMPANY", "UPDATE"],
        userListCompany: ["ADMIN_PANEL", "COMPANY", "VIEW_USER_LIST"],
      },
    },
    userPanel: {
      
    }
  } as const;
  
  export default allQueryKeys;
  