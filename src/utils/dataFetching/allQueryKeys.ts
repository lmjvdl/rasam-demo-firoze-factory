const allQueryKeys = {
  login: ["AUTH", "LOGIN"],
  refreshToken: ["AUTH", "REFRESH TOKEN"],
  adminPanel: {
    company: {
      list: ["ADMIN_PANEL", "COMPANY", "VIEW"],
      delete: ["ADMIN_PANEL", "COMPANY", "DELETE"],
      update: ["ADMIN_PANEL", "COMPANY", "UPDATE"],
    },
    userCompany: {
      list: ["ADMIN_PANEL", "USER_COMPANY", "VIEW"],
      delete: ["ADMIN_PANEL", "USER_COMPANY", "DELETE"],
      update: ["ADMIN_PANEL", "USER_COMPANY", "UPDATE"],
      permission_list: ["ADMIN_PANEL", "USER_COMPANY", "VIEW", "PERMISSION_LIST"],
      user_list: ["ADMIN_PANEL", "USER_COMPANY", "VIEW", "USER_LIST"],
      group_list: ["ADMIN_PANEL", "USER_COMPANY", "VIEW", "GROUP_LIST"],
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
    },
    alarm: {
      list: ["ADMIN_PANEL", "ALARM", "VIEW"],
      delete: ["ADMIN_PANEL", "ALARM", "DELETE"],
      update: ["ADMIN_PANEL", "ALARM", "UPDATE"],
      function_list: ["ADMIN_PANEL", "ALARM", "VIEW", "FUNCTION_LIST"],
      data_type_list: ["ADMIN_PANEL", "ALARM", "VIEW", "DATA_TYPE_LIST"],
      device_list: ["ADMIN_PANEL", "ALARM", "VIEW", "DEVICE_LIST"],
      contacts_list: ["ADMIN_PANEL", "ALARM", "VIEW", "CONTACTS_LIST"],
    },
    alarmDetail: {
      list: ["ADMIN_PANEL", "ALARM_DETAIL", "VIEW"],
      delete: ["ADMIN_PANEL", "ALARM_DETAIL", "DELETE"],
      update: ["ADMIN_PANEL", "ALARM_DETAIL", "UPDATE"],
      parameter_list: ["ADMIN_PANEL", "ALARM_DETAIL", "VIEW", "PARAMETER_LIST"],
      alarm_list: ["ADMIN_PANEL", "ALARM_DETAIL", "VIEW", "ALARM_LIST"],
    },
    function: {
      list: ["ADMIN_PANEL", "FUNCTION", "VIEW"],
      delete: ["ADMIN_PANEL", "FUNCTION", "DELETE"],
      update: ["ADMIN_PANEL", "FUNCTION", "UPDATE"],
    },
    functionParameter: {
      list: ["ADMIN_PANEL", "FUNCTION_PARAMETER", "VIEW"],
      delete: ["ADMIN_PANEL", "FUNCTION_PARAMETER", "DELETE"],
      update: ["ADMIN_PANEL", "FUNCTION_PARAMETER", "UPDATE"],
    },
    contacts: {
      list: ["ADMIN_PANEL", "CONTACTS", "VIEW"],
      delete: ["ADMIN_PANEL", "CONTACTS", "DELETE"],
      update: ["ADMIN_PANEL", "CONTACTS", "UPDATE"],
    },
    operation: {
      list: ["ADMIN_PANEL", "OPERATION", "VIEW"],
      delete: ["ADMIN_PANEL", "OPERATION", "DELETE"],
      update: ["ADMIN_PANEL", "OPERATION", "UPDATE"],
    },
    smsLog: {
      list: ["ADMIN_PANEL", "SMS_LOG", "VIEW"]
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
