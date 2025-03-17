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
    },
    dataType: {
      list: ["ADMIN_PANEL", "DATA_TYPE", "VIEW"],
      delete: ["ADMIN_PANEL", "DATA_TYPE", "DELETE"],
      update: ["ADMIN_PANEL", "DATA_TYPE", "UPDATE"],
    },
    deviceData: {
      list: ["ADMIN_PANEL", "DEVICE_DATA", "VIEW"],
      delete: ["ADMIN_PANEL", "DEVICE_DATA", "DELETE"],
      update: ["ADMIN_PANEL", "DEVICE_DATA", "UPDATE"],
    },
    devices: {
      list: ["ADMIN_PANEL", "DEVICES", "VIEW"],
      delete: ["ADMIN_PANEL", "DEVICES", "DELETE"],
      update: ["ADMIN_PANEL", "DEVICES", "UPDATE"],
      product_line_part_list: ["ADMIN_PANEL", "DEVICES", "VIEW", "PRODUCT_LINE_PART_LIST"],
      data_type_list: ["ADMIN_PANEL", "DEVICES", "VIEW", "DATA_TYPE_LIST"]
    },
    group: {
      list: ["ADMIN_PANEL", "GROUP", "VIEW"],
      delete: ["ADMIN_PANEL", "GROUP", "DELETE"],
      update: ["ADMIN_PANEL", "GROUP", "UPDATE"],
      permission_list: ["ADMIN_PANEL", "GROUP", "VIEW", "PERMISSION_LIST"],
      user_list: ["ADMIN_PANEL", "GROUP", "VIEW", "USER_LIST"]
    },
    permission: {
      list: ["ADMIN_PANEL", "PERMISSION", "VIEW"],
    },
    productLine: {
      list: ["ADMIN_PANEL", "PRODUCT_LINE", "VIEW"],
      delete: ["ADMIN_PANEL", "PRODUCT_LINE", "DELETE"],
      update: ["ADMIN_PANEL", "PRODUCT_LINE", "UPDATE"],
      company: ["ADMIN_PANEL", "PRODUCT_LINE", "VIEW", "COMPANY"],
    },
    productLinePart: {
      list: ["ADMIN_PANEL", "PRODUCT_LINE_PART", "VIEW"],
      delete: ["ADMIN_PANEL", "PRODUCT_LINE_PART", "DELETE"],
      update: ["ADMIN_PANEL", "PRODUCT_LINE_PART", "UPDATE"],
      product_line_list: ["ADMIN_PANEL", "PRODUCT_LINE_PART", "VIEW", "PRODUCT_LINE_LIST"],
    },
    icons: {
      list: ["ADMIN_PANEL", "ICONS", "VIEW"],
      create: ["ADMIN_PANEL", "ICONS", "CREATE"],
    }
  },
  userPanel: {
    preparingBody: {
      baalMill: {
        live: {
          liveData: ["USER_PANEL", "BAAL_MILL", "LIVE"]
        },
        report: {

        }
      },
      fanSpray: {
        live: {
          liveData: ["USER_PANEL", "FAN_SPRAY", "LIVE"]
        },
        report: {

        }
      }
    }
  }
} as const;

export default allQueryKeys;
