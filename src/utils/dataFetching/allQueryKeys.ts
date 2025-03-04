
const allQueryKeys = {
    login: ["AUTH", "LOGIN"],
    refreshToken: ["AUTH", "REFRESH TOKEN"],
    adminPanel: {
      company: {
        list: ["ADMIN_PANEL", "COMPANY", "VIEW"],
        delete: ["ADMIN_PANEL", "COMPANY", "DELETE"],
        update: ["ADMIN_PANEL", "COMPANY", "UPDATE"],
        userListCompany: ["ADMIN_PANEL", "COMPANY", "VIEW_USER_LIST"],
        editUserCompany: ["ADMIN_PANEL", "COMPANY", "EDIT_USER_COMPNAY"]
      },
      user: {
        list: ["ADMIN_PANEL", "USER", "VIEW"],
        delete: ["ADMIN_PANEL", "USER", "DELETE"],
        update: ["ADMIN_PANEL", "USER", "UPDATE"],
      }
    },
    userPanel: {
      
    }
  } as const;
  
  export default allQueryKeys;
  