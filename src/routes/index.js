import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Attributes = lazy(() => import("../pages/Attributes"));
const ChildAttributes = lazy(() => import("../pages/ChildAttributes"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Category = lazy(() => import("../pages/Category"));
const ChildCategory = lazy(() => import("../pages/ChildCategory"));
const Staff = lazy(() => import("../pages/Staff"));
const Customers = lazy(() => import("../pages/Customers"));
const CustomerDetailed = lazy(() => import("../pages/CustomerDetailed"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderInvoice = lazy(() => import("../pages/OrderInvoice"));
const Coupons = lazy(() => import("../pages/Coupons"));
// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import("../pages/404"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const Languages = lazy(() => import("../pages/Languages"));
const Currencies = lazy(() => import("../pages/Currencies"));
const Setting = lazy(() => import("../pages/Setting"));

const City = lazy(() => import('../pages/City'));

const Career = lazy(() => import('../pages/Career'));

const TickRequest = lazy(() => import('../pages/TickRequest'));

const Tee = lazy(() => import('../pages/Tee'));




const Event = lazy(() => import('../pages/Event'));

const CustomerEvent = lazy(() => import('../pages/CustomerEvent'));

const Tournament = lazy(() => import('../pages/Tournament'));

const Travel = lazy(() => import('../pages/Travel'));

const Friend = lazy(() => import('../pages/Friend'));

const Notification = lazy(() => import('../pages/Notification'));

const Course = lazy(() => import('../pages/Course'));

const CustomerTournament = lazy(() => import('../pages/CustomerTournament'));

const Club = lazy(() => import('../pages/Club'));

const CustomerClub = lazy(() => import('../pages/CustomerClub'));

const CustomerTravel = lazy(() => import('../pages/CustomerTravel'));

const ClubPost = lazy(() => import('../pages/ClubPost'));

const ClubComment = lazy(() => import('../pages/ClubComment'));

const PaymentMethod = lazy(() => import('../pages/PaymentMethod'));
const Reward = lazy(() => import('../pages/Reward'));

const CustomerReward = lazy(() => import('../pages/CustomerReward'));

const ClubReport = lazy(() => import('../pages/ClubReport'));

const News = lazy(() => import('../pages/News'));

const Banner = lazy(() => import('../pages/Banner'));

const Page = lazy(() => import('../pages/Page'));

const MeetingRequest = lazy(() => import('../pages/MeetingRequest'));

const Level = lazy(() => import('../pages/Level'));

const Benefit = lazy(() => import('../pages/Benefit'));

const Chat = lazy(() => import('../pages/Chat'));

const Flight = lazy(() => import('../pages/Flight'));

const Rating = lazy(() => import('../pages/Rating'));

const Feedback = lazy(() => import('../pages/Feedback'));

const CustomerTournamentFavourite = lazy(() => import('../pages/CustomerTournamentFavourite'));

const Payment = lazy(() => import('../pages/Payment'));

const ReportName = lazy(() => import('../pages/ReportName'));

const LocationClub = lazy(() => import('../pages/LocationClub'));

const SearchKeyword = lazy(() => import('../pages/SearchKeyword'));

const ChatGroup = lazy(() => import('../pages/ChatGroup'));

const TournamentMedia = lazy(() => import('../pages/TournamentMedia'));

const Calendar = lazy(() => import('../pages/Calendar'));

const CustomerLocation = lazy(() => import('../pages/CustomerLocation'));

const TournamentMediasDrive = lazy(() => import('../pages/TournamentMediasDrive'));

const TravelDetailed = lazy(() => import('../pages/TravelDetailed'));

const TournamentDetailed = lazy(() => import('../pages/TournamentDetailed'));
const SensitiveWord = lazy(() => import('../pages/SensitiveWord'));
const EventDetailed = lazy(() => import('../pages/EventDetailed'));
const PaymentDetailed = lazy(() => import('../pages/PaymentDetailed'));
const FlightResult = lazy(() => import('../pages/FlightResult'));

const FavoriteTravel = lazy(() => import('../pages/FavoriteTravel'));

const Icon = lazy(() => import('../pages/Icon'));

/** TODO: CLIENT ROUTE IMPORT */

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
    {
        path: "/dashboard",
        component: Dashboard,
    },
    {
        path: "/products",
        component: Products,
    },
    {
        path: "/attributes",
        component: Attributes,
    },
    {
        path: "/attributes/:id",
        component: ChildAttributes,
    },
    {
        path: "/product/:id",
        component: ProductDetails,
    },
    {
        path: "/categories",
        component: Category,
    },
    {
        path: "/languages",
        component: Languages,
    },
    {
        path: "/currencies",
        component: Currencies,
    },

    {
        path: "/categories/:id",
        component: ChildCategory,
    },
    {
        path: "/customers",
        component: Customers,
    },
    {
        path: "/customer/:id",
        component: CustomerDetailed,
    },
    {
        path: "/our-staff",
        component: Staff,
    },
    {
        path: "/orders",
        component: Orders,
    },
    {
        path: "/order/:id",
        component: OrderInvoice,
    },
    {
        path: "/coupons",
        component: Coupons,
    },
    { path: "/settings", component: Setting },
    {
        path: "/404",
        component: Page404,
    },
    {
        path: "/coming-soon",
        component: ComingSoon,
    },
    {
        path: "/edit-profile",
        component: EditProfile,
    },


    {
        path: '/citys',
        component: City,
    },

    {
        path: '/careers',
        component: Career,
    },

    {
        path: '/tickRequests',
        component: TickRequest,
    },

    {
        path: '/tees',
        component: Tee,
    },
    {
        path: '/events',
        component: Event,
    },

    {
        path: '/event/:id',
        component: EventDetailed,
    },

    {
        path: '/customerEvents',
        component: CustomerEvent,
    },

    {
        path: '/tournaments',
        component: Tournament,
    },
    {
        path: '/tournament/:id',
        // eslint-disable-next-line no-undef
        component: TournamentDetailed,
    },
    {
        path: '/travels',
        component: Travel,
    },
    {
        path: '/travel/:id',
        // eslint-disable-next-line no-undef
        component: TravelDetailed,
    },

    {
        path: '/friends',
        component: Friend,
    },

    {
        path: '/notifications',
        component: Notification,
    },

    {
        path: '/courses',
        component: Course,
    },

    {
        path: '/customertournaments',
        component: CustomerTournament,
    },

    {
        path: '/clubs',
        component: Club,
    },
    {
        path: '/customerClubs',
        component: CustomerClub,
    },
    {
        path: '/customerTravels',
        component: CustomerTravel,
    },

    {
        path: '/clubPosts',
        component: ClubPost,
    },

    {
        path: '/clubComments',
        component: ClubComment,
    },

    {
        path: '/paymentMethods',
        component: PaymentMethod,
    },

    {
        path: '/customerRewards',
        component: CustomerReward,
    },

    {
        path: '/clubReports',
        component: ClubReport,
    },

    {
        path: '/newss',
        component: News,
    },

    {
        path: '/banners',
        component: Banner,
    },

    {
        path: '/pages',
        component: Page,
    },

    {
        path: '/meetingRequests',
        component: MeetingRequest,
    },

    {
        path: '/levels',
        component: Level,
    },

    {
        path: '/benefits',
        component: Benefit,
    },

    {
        path: '/chats',
        component: Chat,
    },

    {
        path: '/flights',
        component: Flight,
    },

    {
        path: '/ratings',
        component: Rating,
    },

    {
        path: '/feedbacks',
        component: Feedback,
    },

    {
        path: '/customerTournamentFavourites',
        component: CustomerTournamentFavourite,
    },

    {
        path: '/payments',
        component: Payment,
    },
    {
        path: '/payment/:id',
        component: PaymentDetailed,
    },
    {
        path: '/reportNames',
        component: ReportName,
    },

    {
        path: '/locationClubs',
        component: LocationClub,
    },

    {
        path: '/searchKeywords',
        component: SearchKeyword,
    },

    {
        path: '/chatGroups',
        component: ChatGroup,
    },

    {
        path: '/tournamentMedias',
        component: TournamentMedia,
    },

    {
        path: '/customerLocations',
        component: CustomerLocation,
    },

    {
        path: '/calendars',
        component: Calendar,
    },

    {
    path: '/tournamentMediasDrives',
    component: TournamentMediasDrive,
},

{
    path: '/sensitiveWords',
    component: SensitiveWord,
},

{
    path: '/flightResults',
    component: FlightResult,
},

{
    path: '/favoriteTravels',
    component: FavoriteTravel,
},

{
    path: '/icons',
    component: Icon,
},

/** TODO: CLIENT ROUTE */
];

export default routes;
