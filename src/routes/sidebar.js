import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiStar,
  FiPlay,
  FiSlack,
  FiGlobe,
  FiBookOpen,
  FiCreditCard,
  FiTarget,
  FiFileText,
  FiFileMinus,
} from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";

import {
  MdGolfCourse,
  MdOutlineFeedback,
  MdReport,
  MdOutlineSubtitles,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { BiNews, BiCommentDetail } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { MdTour, MdOutlineFlight, MdPayment } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaLevelUpAlt, FaHandHoldingHeart } from "react-icons/fa";
import { BsPinMapFill, BsExclamationTriangle, BsHandIndex } from "react-icons/bs";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: RxDashboard, // icon
    name: "Dashboard", // name that appear in Sidebar
  },

  // {
  //   icon: FiSlack,
  //   name: "Catalog",
  //   routes: [
  //     {
  //       path: "/products",
  //       name: "Products",
  //     },
  //     {
  //       path: "/categories",
  //       name: "Categories",
  //     },
  //     {
  //       path: "/attributes",
  //       name: "Attributes",
  //     },
  //     {
  //       path: "/coupons",
  //       name: "Coupons",
  //     },
  //   ],
  // },


  {
    path: "/our-staff",
    icon: FiUser,
    name: "OurStaff",
  },

  {
    icon: FiUsers,
    name: "Customer",
    routes: [
      {
        path: "/customers",
        name: "List",
      },
      {
        path: "/tickRequests",
        name: "Tick Gold Request",
      },
      {
        path: "/levels",
        icon: FaLevelUpAlt,
        name: "Level",
      },
      {
        path: "/benefits",
        icon: FaHandHoldingHeart,
        name: "Benefit",
      },
      {
        path: "/feedbacks",
        icon: MdOutlineFeedback,
        name: "Feedback",
      },
    ],
  },
  // {
  //     icon: FiGlobe,
  //     name: "International",
  //     routes: [
  //         {
  //             path: "/languages",
  //             name: "Languages",
  //         },
  //         {
  //             path: "/currencies",
  //             name: "Currencies",
  //         },
  //     ],
  // },
  // {
  //   icon: FiTarget,
  //   name: "ViewStore",
  //   path: "http://localhost:3000",
  //   outside: "store",
  // },

  // {
  //   icon: FiSlack,
  //   name: "Pages",
  //   routes: [
  //     // submenu

  //     {
  //       path: "/404",
  //       name: "404",
  //     },
  //     {
  //       path: "/coming-soon",
  //       name: "Coming Soon",
  //     },
  //   ],
  // },

  // {
  //     path: '/citys',
  //     icon: FiSettings,
  //     name: 'City',
  // },

  // {
  //     path: '/careers',
  //     icon: FiSettings,
  //     name: 'Career',
  // },



  // {
  //     path: '/tees',
  //     icon: FiSettings,
  //     name: 'Tee',
  // },


  // {
  //     path: '/customerEvents',
  //     icon: FiSettings,
  //     name: 'CustomerEvent',
  // },


  // {
  //     path: '/friends',
  //     icon: FiSettings,
  //     name: 'Friend',
  // },

  // {
  //     path: '/notifications',
  //     icon: FiSettings,
  //     name: 'Notification',
  // },

  // {
  //     path: '/courses',
  //     icon: FiSettings,
  //     name: 'Course',
  // },

  // {
  //     path: '/customertournaments',
  //     icon: FiSettings,
  //     name: 'CustomerTournament',
  // },

  {
    icon: BsHandIndex,
    name: "Bookings",
    routes: [
      {
        path: '/events',
        icon: AiOutlineCalendar,
        name: 'Event',
      },
      {
        path: '/tournaments',
        icon: MdTour,
        name: 'Tournament',
      },
      {
        path: '/travels',
        icon: MdOutlineFlight,
        name: 'Travel',
      },
      {
        path: "/payments",
        icon: MdPayment,
        name: "Payment",
      },
    ],
  },

  {
    icon: MdGolfCourse,
    name: "Clubs",
    routes: [
      {
        path: "/clubs",
        name: "List",
      },
      // {
      //   path: '/clubComments',
      //   name: 'Comments',
      // },
      {
        path: "/clubReports",
        name: "Club's Post Report",
      },
    ],
  },


  // {
  //     path: '/customerClubs',
  //     icon: FiSettings,
  //     name: 'CustomerClub',
  // },
  // {
  //     path: '/customerTravels',
  //     icon: FiSettings,
  //     name: 'CustomerTravel',
  // },
  // {
  //     path: '/clubPosts',
  //     icon: FiFileText,
  //     name: 'Club\'s Post',
  // },



  // {
  //     path: '/customerRewards',
  //     icon: FiSettings,
  //     name: 'CustomerReward',
  // },

  {
    icon: BiNews,
    name: "Content",
    routes: [
      {
        path: "/newss",
        name: "News",
      },
      {
        path: "/banners",
        name: "Banner",
      },
      {
        path: "/pages",
        name: "Page",
      },
    ],
  },







  // {
  //   path: "/meetingRequests",
  //   icon: FiSettings,
  //   name: "MeetingRequest",
  // },



  // {
  //     path: '/chats',
  //     icon: FiSettings,
  //     name: 'Chat',
  // },

  // {
  //   path: '/flights',
  //   icon: FiPlay,
  //   name: 'Flight',
  // },

  // {
  //     path: '/ratings',
  //     icon: FiSettings,
  //     name: 'Rating',
  // },



  // {
  //     path: '/customerTournamentFavourites',
  //     icon: FiSettings,
  //     name: 'Customer Tournament Favourite',
  // },



  // {
  //     path: '/reportNames',
  //     icon: FiSettings,
  //     name: 'ReportName',
  // },

  // {
  //   path: "/locationClubs",
  //   icon: BsPinMapFill,
  //   name: "Location Club",
  // },

  // {
  //     path: '/searchKeywords',
  //     icon: FiSettings,
  //     name: 'SearchKeyword',
  // },

  // {
  //     path: '/chatGroups',
  //     icon: FiSettings,
  //     name: 'ChatGroup',
  // },

  // {
  //     path: '/tournamentMedias',
  //     icon: FiSettings,
  //     name: 'TournamentMedia',
  // },

  // {
  //     path: '/calendars',
  //     icon: MdOutlineCalendarToday,
  //     name: 'Calendar',
  // },

  // {
  //     path: '/customerLocations',
  //     icon: FiSettings,
  //     name: 'CustomerLocation',
  // },

  // {
  //   path: '/sensitiveWords',
  //   icon: BsExclamationTriangle,
  //   name: 'SensitiveWord',
  // },

  // {
  //   path: "/settings",
  //   icon: FiSettings,
  //   name: "StoreSetting",
  // },

  //   {
  //     path: "/tournamentMediasDrives",
  //     icon: FiSettings,
  //     name: "TournamentMediasDrive",
  //   },



//   {
//     path: '/flightResults',
//     icon: FiSettings,
//     name: 'FlightResult',
// },

// {
//     path: '/favoriteTravels',
//     icon: FiSettings,
//     name: 'FavoriteTravel',
// },

// {
//     path: '/icons',
//     icon: FiStar,
//     name: 'Icon',
// },

/** TODO: SIDEBAR */
];

export default sidebar;
