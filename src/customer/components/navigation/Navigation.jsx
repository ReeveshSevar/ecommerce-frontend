import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { navigation } from "./navigationData"
import { Avatar, Button, Menu, MenuItem, Select } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModel from "../../Auth/AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";
import { searchProduct } from "../../../State/Product/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState("");  // This will store the search query
  const openUserMenu = Boolean(anchorEl);
  const { auth } = useSelector(store => store)
  const { products } = useSelector((store) => store);
  const { cart } = useSelector((store) => store)
  const jwt = localStorage.getItem("jwt");
  const searchProducts = products.searchResults;
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    handleCloseUserMenu();

    if (path) {
      navigate(path);
    }
  };

  const handleButtonClick = () => {
    navigate('/search-data', { state: { searchProducts } });
  };

  useEffect(() => {
    if (category.trim() !== "") {
      dispatch(searchProduct(category));
    }
  }, [dispatch, category])


  const handleSearchChange = (event) => {
    setCategory(event.target.value); // Update the category state with the new input value
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update the category state with the new input value
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  const handleLogout = () => {
    dispatch(logout())
    handleCloseUserMenu()
    navigate("/")
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1)
    }
  }, [jwt, auth.jwt])


  useEffect(() => {
    if (auth.user) {
      handleClose()
    }
  }, [auth.user])

  const menuItem = Array.isArray(products?.products) ? products.products : []; // Safely handle potential null or undefined
  // Filter out duplicate categories based on category name
  const uniqueCategories = menuItem
    .filter((item, index, self) =>
      index === self.findIndex((t) => t.category.name === item.category.name) // filter based on category name
    )
    .map(item => item.category.name); // Extract category object

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <p className="-m-2 block p-2 text-gray-500">
                                    {"item.name"}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="/"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="/" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p> */}

        <nav aria-label="Top" className="mx-auto" style={{ background: 'linear-gradient(300deg, #043b5c, #2B2B52)' }}>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0" onClick={() => navigate("/")}>
                <span className="sr-only">Your Company</span>
                <img
                  src="https://t4.ftcdn.net/jpg/05/10/79/43/360_F_510794397_JeTKmvO6DdNmNKzzbccxJVfIgjiK1Yd7.jpg"
                  alt="Shopwithzosh"
                  className="h-10 w-10 mr-2 rounded-3xl"
                />
              </div>

              {/* Flyout menus */}

              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-white hover:text-gray-300", // Change text color to white
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full bg-black text-white text-sm"> {/* Set black background and white text */}
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-black shadow"
                                aria-hidden="true"
                              />

                              <div className="relative" style={{ background: 'linear-gradient(60deg, #bd8cf5, #7acff5)' }}> {/* Set background to black */}
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden border-2 border-[#565659] rounded-lg bg-gray-100 group-hover:opacity-75" style={{ width: '180px' }}>
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center "
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-white"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1 text-white"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-white"
                                          >
                                            {section.name}
                                          </p>
                                          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="cursor-pointer text-[#131314] hover:text-gray-300"
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-white hover:text-gray-300"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>
              <div>
                {/* Search Bar */}
                <div className="flex">
                  <Select
                    displayEmpty
                    className="bg-white text-gray-800 text-sm"
                    value={category} // Bind the value to the selectedCategory state
                    onChange={handleCategoryChange} // Handle category change
                    style={{
                      width: '100px',
                      height: '30px', // Reduced height
                      backgroundColor: "#F9FAFB",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Light shadow for depth
                      marginLeft: '70px', // Removed margin to prevent any gap
                      borderRadius: '0' // Removed rounded corners
                    }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {uniqueCategories.map((category) => (
                      <MenuItem value={category} onChange={handleButtonClick}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={category} // Bind the value to the category state
                    onChange={handleSearchChange} // Update category state on input change
                    className="p-1 w-full text-sm text-black"
                    style={{
                      width: '70vh',
                      height: '30px', // Reduced height
                      backgroundColor: "#F9FAFB", // Light gray background
                      border: "1px solid #E5E7EB", // Subtle border
                      outline: "none",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Light shadow for depth
                      borderRadius: '0', // Removed rounded corners
                      marginLeft: '0', // Removed margin to remove the gap between elements
                    }}
                  />
                  <Button
                    sx={{
                      backgroundColor: "#4CAF50", // Soft green background
                      color: "#FFF", // White text color
                      padding: "2px 8px", // Reduced padding for a smaller button
                      fontSize: "12px", // Slightly smaller font size
                      fontWeight: "500", // Medium weight for the text                     
                      border: "1px solid #4CAF50", // Matching border color
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                      transition: "background-color 0.3s, transform 0.3s", // Smooth transition for hover
                      '&:hover': {
                        backgroundColor: "#45A049", // Darker green on hover
                        transform: "scale(1.05)", // Slight scaling effect on hover
                      },
                      '&:focus': {
                        outline: "none", // Remove the default focus outline
                        border: "1px solid #45A049", // Border color change on focus
                      },
                      borderRadius: '0', // Removed rounded corners
                      marginLeft: '0', // Removed margin to eliminate gap
                    }}
                    onClick={handleButtonClick}
                  >
                    Search
                  </Button>
                </div>
              </div>


              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {auth.user?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        sx={{
                          color: "white",
                          cursor: "pointer",
                          height: '30px', // Slightly bigger size
                          width: '30px',  // Slightly bigger size
                          background: '#4A90E2', // Solid blue background
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',  // Adding shadow for depth
                          borderRadius: '50%', // Ensuring circular shape
                          transition: 'transform 0.3s ease',  // Smooth transition effect for hover
                          '&:hover': {
                            transform: 'scale(1.1)',  // Slightly enlarges the avatar on hover
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',  // Enhanced shadow on hover
                          },
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        className="text-gray-600"
                      >
                        {auth.user.roles.slice(5) === "ADMIN" ? (
                          <MenuItem onClick={() => handleMenuItemClick("/admin")}>
                            Admin
                          </MenuItem>
                        ) : <></>}
                        <MenuItem onClick={() => handleMenuItemClick("/account/profile")}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick("/account/order")}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={() => {
                          handleMenuItemClick(); // Close menu
                          handleLogout(); // Perform logout
                        }}>
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-white bg-blue-600 border border-transparent rounded-full px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      sx={{
                        color: "#ffffff",
                      }}
                    >
                      Signin
                    </Button>
                  )}
                </div>


                {/* Cart */}
                {auth.user ?
                  <div className="ml-4 flow-root lg:ml-6">
                    <Button
                      className="group -m-2 flex items-center p-2"
                    >
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-500 group-hover:scale-125 group-hover:shadow-2xl transition-all duration-300 ease-in-out transform"
                        style={{ color: 'white' }}
                        aria-hidden="true"
                        onClick={() => navigate("/cart")}
                      />
                      <span className="ml-2 text-sm font-medium text-white group-hover:text-white">
                        {cart.cart?.totalItem}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </Button>
                  </div> : <></>
                }
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}