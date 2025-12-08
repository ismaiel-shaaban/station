const getIconForTitle = (title) => {
  const iconMap = {
    "Dashboard": "solar:home-smile-angle-outline",
    "Drivers": "heroicons:user-group-solid",
    "Branch_manager": "heroicons:user-circle-solid",
    "Branches": "heroicons:building-office-solid",
    "MenuItems": "heroicons:bars-3-solid",
    "Groups": "heroicons:folder-solid",
    "Visits": "heroicons:bell-solid",
    "Templates": "heroicons:document-text-solid",
    "العضويات": "heroicons:rectangle-group-solid", // Group title icon
    "الزيارات": "heroicons:chart-pie-solid", // Group title icon
    "المواد": "material-symbols:menu-book-outline", // New icon for المواد
    "الشعب": "heroicons:academic-cap-solid", // New icon for الشعب
    "الصفوف": "heroicons:academic-cap-solid", // New icon for الصفوف
    "المدرسين": "heroicons:users-solid", // New icon for المدرسين
    "جدول الحصص": "heroicons:calendar-solid", // New icon for جدول الحصص
    "الطلاب": "heroicons:users-solid", // New icon for الطلاب
    "تسجيل الحضور والغياب": "heroicons:clipboard-document-check-solid", // New icon for تسجيل الحضور والغياب
    "تقارير الغياب": "heroicons:chart-bar-solid", // New icon for تقارير الغياب
    "تقارير الامتحانات": "heroicons:document-text-solid", // New icon for تقارير الامتحانات
    "صلاحيات المتاجر": "heroicons:shield-check-solid", // New icon for صلاحيات المتاجر
    "اللغات": "heroicons:language-solid", // New icon for اللغات
    "Twilio": "simple-icons:twilio", // Add Twilio icon
    "الحاويات": "heroicons:folder-solid", // New icon 
    "البانرات": "heroicons:photo-solid", // New icon for البانرات
    "المستخدمين": "heroicons:user-circle-solid", // New icon for المستخدمين
    "الطلبات": "heroicons:shopping-cart-solid", // New icon for الطلبات
  };

  return iconMap[title] || "heroicons:question-mark-circle-solid"; // Default icon
};
export const sidebarMenu = [
  {
    title: "Dashboard",
    icon: getIconForTitle("Dashboard"),
    path: "/dashboard",
  },
  // {
  //   title: "المواد",
  //   icon: getIconForTitle("المواد"),
  //   path: "/dashboard/sublects",
  // },
  // {
  //   title: "الصفوف",
  //   icon: getIconForTitle("الصفوف"),
  //   path: "/dashboard/stages",
  // },
  {
    title: "المتاجر",
    icon: getIconForTitle("المدرسين"),
    path: "/dashboard/merchants",
  },
  {
    title: "أنواع المتاجر",
    icon: getIconForTitle("صلاحيات المتاجر"),
    path: "/dashboard/merchants-types",
  },
  {
    title: "الطلبات",
    icon: getIconForTitle("الطلبات"),
    path: "/dashboard/orders",
  },
  {
    title: "البانرات",
    icon: getIconForTitle("البانرات"),
    path: "/dashboard/banners",
  },
  {
    title: "المستخدمين",
    icon: getIconForTitle("المستخدمين"),
    path: "/dashboard/users",
  },
  {
    title: "الاشعارات",
    icon: getIconForTitle("Visits"),
    path: "/dashboard/notifications",
  },
  // {
  //   title: "اللغات",
  //   icon: getIconForTitle("اللغات"),
  //   path: "/dashboard/language",
  // },
  // {
  //   title: "المدرسين المستقلين",
  //   icon: getIconForTitle("المدرسين"),
  //   path: "/dashboard/teachers",
  // },
  // {
  //   title: "الاعلانات",
  //   icon: getIconForTitle("الصفوف"),
  //   path: "/dashboard/banners",
  // },
  // {
  //   title: "انشاء جدول الحصص",
  //   icon: getIconForTitle("جدول الحصص"),
  //   path: "/dashboard/table",
  // },
  // {
  //   title: "عرض جدول الحصص",
  //   icon: getIconForTitle("جدول الحصص"),
  //   path: "/dashboard/display-table",
  // },
  // {
  //   title: "تسجيل الحضور والغياب",
  //   icon: getIconForTitle("تسجيل الحضور والغياب"),
  //   path: "/dashboard/studentsAttendance",
  // },
  // {
  //   title: "تقارير الغياب",
  //   icon: getIconForTitle("تقارير الغياب"),
  //   path: "/dashboard/studentsReport",
  // },
  // {
  //   title: "تقارير الامتحانات",
  //   icon: getIconForTitle("تقارير الامتحانات"),
  //   path: "/dashboard/studentsExamsReport",
  // },
  // {
  //   title: "المشرفين",
  //   icon: getIconForTitle("Branch_manager"),
  //   path: "/dashboard/admins",
  // },


 
  // {
  //   title: "Templates",
  //   icon: getIconForTitle("Templates"),
  //   path: "/dashboard/templates",
  // },
  // {
  //   title: "Visits",
  //   icon: getIconForTitle("Visits"),
  //   path: "/dashboard/visits",
  // },
  // {
  //     title: "الدعم الفني",
  //     icon: "bi:chat-dots",
  //     path: "/dashboard/chat-message",
  // },
  // {
  //     title: "Calendar",
  //     icon: "solar:calendar-outline",
  //     path: "/dashboard/calendar-main",
  // },
  // {
  //     title: "Kanban",
  //     icon: "material-symbols:map-outline",
  //     path: "/dashboard/kanban",
  // },
  // {
  //     title: "Invoice",
  //     icon: "hugeicons:invoice-03",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "List",
  //             path: "/dashboard/invoice-list",
  //         },
  //         {
  //             title: "Preview",
  //             path: "/dashboard/invoice-preview",
  //         },
  //         {
  //             title: "Add New",
  //             path: "/dashboard/invoice-add",
  //         },
  //         {
  //             title: "Edit",
  //             path: "/dashboard/invoice-edit",
  //         },
  //     ],
  // },
  // {
  //     title: "AI Application",
  //     icon: "ri-robot-2-line",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Text Generator",
  //             path: "/dashboard/text-generator",
  //         },
  //         {
  //             title: "Code Generator",
  //             path: "/dashboard/code-generator",
  //         },
  //         {
  //             title: "Image Generator",
  //             path: "/dashboard/image-generator",
  //         },
  //         {
  //             title: "Voice Generator",
  //             path: "/dashboard/voice-generator",
  //         },
  //         {
  //             title: "Video Generator",
  //             path: "/dashboard/video-generator",
  //         },
  //     ],
  // },
  // {
  //     title: "Crypto Currency",
  //     icon: "ri-robot-2-line",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Wallet",
  //             path: "/dashboard/wallet",
  //         },
  //         {
  //             title: "Marketplace",
  //             path: "/dashboard/marketplace",
  //         },
  //         {
  //             title: "Marketplace Details",
  //             path: "/dashboard/marketplace-details",
  //         },
  //         {
  //             title: "Portfolios",
  //             path: "/dashboard/portfolio",
  //         },
  //     ],
  // },
  // {
  //     title: "UI Elements",
  //     groupTitle: true,
  // },
  // {
  //     title: "Components",
  //     icon: "solar:document-text-outline",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Typography",
  //             path: "/dashboard/typography",
  //         },
  //         {
  //             title: "Colors",
  //             path: "/dashboard/colors",
  //         },
  //         {
  //             title: "Button",
  //             path: "/dashboard/button",
  //         },
  //         {
  //             title: "Dropdown",
  //             path: "/dashboard/dropdown",
  //         },
  //         {
  //             title: "Alerts",
  //             path: "/dashboard/alert",
  //         },
  //         {
  //             title: "Card",
  //             path: "/dashboard/card",
  //         },
  //         {
  //             title: "Carousel",
  //             path: "/dashboard/carousel",
  //         },
  //         {
  //             title: "Avatars",
  //             path: "/dashboard/avatar",
  //         },
  //         {
  //             title: "Progress Bar",
  //             path: "/dashboard/progress",
  //         },
  //         {
  //             title: "Tabs & Accordion",
  //             path: "/dashboard/tabs",
  //         },
  //         {
  //             title: "Pagination",
  //             path: "/dashboard/pagination",
  //         },
  //         {
  //             title: "Badges",
  //             path: "/dashboard/badges",
  //         },
  //         {
  //             title: "Tooltip & Popover",
  //             path: "/dashboard/tooltip",
  //         },
  //         {
  //             title: "Videos",
  //             path: "/dashboard/videos",
  //         },
  //         {
  //             title: "Star Ratings",
  //             path: "/dashboard/star-rating",
  //         },
  //         {
  //             title: "Tags",
  //             path: "/dashboard/tags",
  //         },
  //         {
  //             title: "List",
  //             path: "/dashboard/list",
  //         },
  //         {
  //             title: "Calendar",
  //             path: "/dashboard/calendar",
  //         },
  //         {
  //             title: "Radio",
  //             path: "/dashboard/radio",
  //         },
  //         {
  //             title: "Switch",
  //             path: "/dashboard/switch",
  //         },
  //         {
  //             title: "Upload",
  //             path: "/dashboard/image-upload",
  //         },
  //     ],
  // },
  // {
  //     title: "Forms",
  //     icon: "heroicons:document",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Input Forms",
  //             path: "/dashboard/form",
  //         },
  //         {
  //             title: "Input Layout",
  //             path: "/dashboard/form-layout",
  //         },
  //         {
  //             title: "Form Validation",
  //             path: "/dashboard/form-validation",
  //         },
  //         {
  //             title: "Form Wizard",
  //             path: "/dashboard/wizard",
  //         },
  //     ],
  // },
  // {
  //     title: "Table",
  //     icon: "mingcute:storage-line",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Basic Table",
  //             path: "/dashboard/table-basic",
  //         },
  //         {
  //             title: "Data Table",
  //             path: "/dashboard/table-data",
  //         },
  //     ],
  // },
  // {
  //     title: "Chart",
  //     icon: "solar:pie-chart-outline",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Line Chart",
  //             path: "/dashboard/line-chart",
  //         },
  //         {
  //             title: "Column Chart",
  //             path: "/dashboard/column-chart",
  //         },
  //         {
  //             title: "Pie Chart",
  //             path: "/dashboard/pie-chart",
  //         },
  //     ],
  // },
  // {
  //     title: "Widgets",
  //     icon: "fe:vector",
  //     path: "/dashboard/widgets",
  // },
  // {
  //     title: "Users",
  //     icon: "flowbite:users-group-outline",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Users List",
  //             path: "/dashboard/users-list",
  //         },
  //         {
  //             title: "Update Users",
  //             path: "/dashboard/users-grid",
  //         },
  //         {
  //             title: "Add User",
  //             path: "/dashboard/add-user",
  //         },
  //         {
  //             title: "View Profile",
  //             path: "/dashboard/view-profile",
  //         },
  //     ],
  // },
  // {
  //     title: "Role & Access",
  //     icon: "ri-user-settings-line",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Role & Access",
  //             path: "/dashboard/role-access",
  //         },
  //         {
  //             title: "Assign Role",
  //             path: "/dashboard/assign-role",
  //         },
  //     ],
  // },
  // {
  //     title: "Application",
  //     groupTitle: true,
  // },
  // {
  //     title: "Authentication",
  //     icon: "simple-line-icons:vector",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Sign In",
  //             path: "/dashboard/sign-in",
  //         },
  //         {
  //             title: "Sign Up",
  //             path: "/dashboard/sign-up",
  //         },
  //         {
  //             title: "Forgot Password",
  //             path: "/dashboard/forgot-password",
  //         },
  //     ],
  // },
  // {
  //     title: "Gallery",
  //     icon: "flowbite:users-group-outline",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Gallery Grid",
  //             path: "/dashboard/gallery-grid",
  //         },
  //         {
  //             title: "Gallery Grid Desc",
  //             path: "/dashboard/gallery",
  //         },
  //         {
  //             title: "Gallery Masonry",
  //             path: "/dashboard/gallery-masonry",
  //         },
  //         {
  //             title: "Gallery Hover Effect",
  //             path: "/dashboard/gallery-hover",
  //         },
  //     ],
  // },
  // {
  //     title: "Pricing",
  //     icon: "hugeicons:money-send-square",
  //     path: "/dashboard/pricing",
  // },
  // {
  //     title: "Blog",
  //     icon: "flowbite:users-group-outline",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Blog",
  //             path: "/dashboard/blog",
  //         },
  //         {
  //             title: "Blog Details",
  //             path: "/dashboard/blog-details",
  //         },
  //         {
  //             title: "Add Blog",
  //             path: "/dashboard/add-blog",
  //         },
  //     ],
  // },
  // {
  //     title: "Testimonials",
  //     icon: "ri-star-line",
  //     path: "/dashboard/testimonials",
  // },
  // {
  //     title: "FAQs",
  //     icon: "mage:message-question-mark-round",
  //     path: "/dashboard/faq",
  // },
  // {
  //     title: "404",
  //     icon: "streamline:straight-face",
  //     path: "/dashboard/error",
  // },
  // {
  //     title: "Terms & Conditions",
  //     icon: "octicon:info-24",
  //     path: "/dashboard/terms-condition",
  // },
  // {
  //     title: "Coming Soon",
  //     icon: "ri-rocket-line",
  //     path: "/dashboard/coming-soon",
  // },
  // {
  //     title: "Access Denied",
  //     icon: "ri-folder-lock-line",
  //     path: "/dashboard/access-denied",
  // },
  // {
  //     title: "Maintenance",
  //     icon: "ri-hammer-line",
  //     path: "/dashboard/maintenance",
  // },
  // {
  //     title: "Blank Page",
  //     icon: "ri-checkbox-multiple-blank-line",
  //     path: "/dashboard/blank-page",
  // },
  // {
  //     title: "Settings",
  //     icon: "icon-park-outline:setting-two",
  //     path: "#",
  //     submenu: [
  //         {
  //             title: "Company",
  //             path: "/dashboard/company",
  //         },
  //         {
  //             title: "Notification",
  //             path: "/dashboard/notification",
  //         },
  //         {
  //             title: "Notification Alert",
  //             path: "/dashboard/notification-alert",
  //         },
  //         {
  //             title: "Theme",
  //             path: "/dashboard/theme",
  //         },
  //         {
  //             title: "Currencies",
  //             path: "/dashboard/currencies",
  //         },
  //         {
  //             title: "Languages",
  //             path: "/dashboard/language",
  //         },
  //         {
  //             title: "Payment Gateway",
  //             path: "/dashboard/payment-gateway",
  //         },
  //     ],
  // },
  // {
  //   title: "الحاويات",
  //   icon: getIconForTitle("الحاويات"),
  //   path: "/dashboard/bucket",
  // },
  // {
  //   title: "Twilio",
  //   icon: getIconForTitle("Twilio"),
  //   path: "/dashboard/twilio",
  // },
];