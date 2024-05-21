import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import SpecialOfferImage from "../../assets/offer5.png";
import AlterFoodImage from "../../assets/altfood3.jpg";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Drawer,
  IconButton,
  useMediaQuery,
  TextField,
} from "@material-ui/core";
// import MenuIcon from '@material-ui/icons/Menu';
import { FaBars, FaSearch } from "react-icons/fa";
import Image1 from "../../assets/back2.png";
import CustomUnderline from "../CustomUnderLine";
import "../../App.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  sidebar2: {
    width: "20%",
    flexShrink: 0,
  },
  sidebar1: {
    width: "20%",
    position: "sticky",
    top: 0,
    height: "100vh", // Adjust according to your layout
    overflowY: "auto",
    // borderRight: `1px solid ${theme.palette.divider}`,
    background: "none", // Remove the background
    boxShadow: "none", // Remove the box shadow
    borderRight: "none",
    paddingLeft: "10px",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  content: {
    width: "80%",
    padding: theme.spacing(2),
    overflowY: "auto",
  },
  card: {
    width: 270,
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    // boxShadow: "none",
  },
  cardContent: {
    flexGrow: 1,
  },
  image: {
    height: 200,
    objectFit: "cover",
  },
  imageContainer: {
    position: "relative",
  },
  mainImage: {
    height: 200,
    objectFit: "cover",
  },
  specialOfferImage: {
    position: "absolute",
    top: -1,
    right: -2,
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    zIndex: 1, // Ensure it's above the main image
  },
  custombtn: {
    backgroundColor: "#C59D5F",
    // borderRadius: "20px",
    color: "white",
    "&::before": {
      borderTop: "2px solid transparent",
      borderLeft: "2px solid transparent",
      transform: "translate(-100%, -100%)", // Initial position outside the button
    },
    "&::after": {
      borderBottom: "2px solid transparent",
      borderRight: "2px solid transparent",
      transform: "translate(100%, 100%)", // Initial position outside the button
    },
    "&:hover": {
      "&::before, &::after": {
        transform: "translate(0, 0)", // Move pseudo-elements to button corners on hover
      },
      backgroundColor: "white",
      color: "#C59D5F",
      boxShadow: "0 0 0 1px #C59D5F",
      // transition: "box-shadow 0.3s ease",
      // borderColor: "1px solid #C59D5F",
    },
    borderColor: "#C59D5F",
    borderStyle: "solid", // Add border style
    borderWidth: "1px", // Add border width
    boxShadow: "none",
    marginLeft: "60px",
    textTransform: "none",
  },
}));

const CategoryPage = () => {
  const classes = useStyles();
  const [activeCookId, setActiveCookId] = useState(null);
  const [uniqueCookIds, setUniqueCookIds] = useState([]);
  const [uniqueCategoryIds, setUniqueCategoryIds] = useState([]);
  const [groupedByCategoryId, setGroupedByCategoryId] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemCounts, setItemCounts] = useState(() => {
    const storedItemCounts = localStorage.getItem("itemCounts");
    if (storedItemCounts) {
      return JSON.parse(storedItemCounts);
    } else {
      return {};
    }
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://akshayapatra-itemfunction.azurewebsites.net/api/Akshayapatra-original-table?code=5X7nqsMQ4U3LV9VEOkjc1v6ecdsZcseWv5Y_jistQq5LAzFu2NwLHA%3D%3D"
      );

      const responseData = await response.json();

      console.log("Response",responseData);

      const filteredData = responseData.filter(
        (item) =>
          item.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.CategoryId.toLowerCase().toString().includes(searchQuery.toLowerCase())
      );

      if (filteredData.length > 0) {
        const categoryIdsSet = new Set();
        filteredData.forEach((item) => {
          categoryIdsSet.add(item.CategoryId);
        });
        const uniqueCategoryIdsArray = Array.from(categoryIdsSet);
        setUniqueCategoryIds(uniqueCategoryIdsArray);

        // const groupedByCookId = {};
        // uniqueCookIdsArray.forEach((cookId) => {
        //   const itemsForCook = filteredData.filter(
        //     (item) => item.CookId === cookId && item.Status === "Available"
        //   );
        //   groupedByCookId[cookId] = itemsForCook;
        // });
        // setGroupedByCookId(groupedByCookId);
        // console.log(groupedByCookId);

        const groupedByCategoryId = {};
        uniqueCategoryIdsArray.forEach((categoryId) => {
          const itemsForCook = filteredData.filter(
            (item) => item.CategoryId === categoryId && item.Status === "Available"
          );
          groupedByCategoryId[categoryId] = itemsForCook;
        });
        setGroupedByCategoryId(groupedByCategoryId);
        console.log(groupedByCategoryId);

      if (Object.keys(itemCounts).length === 0) {
        const initialCounts = {};
        uniqueCategoryIdsArray.forEach((categoryId) => {
          const itemsForCook = filteredData.filter(
            (item) => item.CategoryId === categoryId && item.Status === "Available"
          );
          itemsForCook.forEach((item) => {
            initialCounts[item.id] = 0;
          });
        });
        setItemCounts(initialCounts);
        localStorage.setItem("itemCounts", JSON.stringify(initialCounts));
      } else {
        const copyCounts = JSON.parse(localStorage.getItem("itemCounts"));
        const initialCounts = {};
        uniqueCategoryIdsArray.forEach((categoryId) => {
          const itemsForCook = filteredData.filter(
            (item) => item.CategoryId === categoryId && item.Status === "Available"
          );
          itemsForCook.forEach((item) => {
            console.log(item.CategoryId, initialCounts[item.id]);
            if (copyCounts[item.id] == undefined) {
              initialCounts[item.id] = 0;
            } else initialCounts[item.id] = copyCounts[item.id];
          });
        });
        setItemCounts(initialCounts);
        localStorage.setItem("itemCounts", JSON.stringify(initialCounts));
      }
    } else {
      console.log("Item not found");
    }

    setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sections = document.querySelectorAll("[id^='cookId_']");
      let activeCookId = null;

      // Iterate through sections to find the one in view
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          activeCookId = section.id.replace("cookId_", "");
        }
      });

      // Update the activeCookId state
      setActiveCookId(activeCookId);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: Remove the scroll event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchQuery]); // Add searchQuery as a dependency

  useEffect(() => {
    // Update local storage when itemCounts changes
    localStorage.setItem("itemCounts", JSON.stringify(itemCounts));
  }, [itemCounts]);

  const handleSidebarClick = (cookId) => {
    setActiveCookId(cookId);
    const section = document.getElementById(`cookId_${cookId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to handle adding items to the cart
  const handleAddToCart = (itemId) => {
    console.log(itemId);
    // Create a copy of itemCounts
    const updatedItemCounts = { ...itemCounts };

    // Update the count for the clicked item
    updatedItemCounts[itemId] = updatedItemCounts[itemId] + 1;

    // Set the state synchronously
    setItemCounts(updatedItemCounts);
    localStorage.setItem("itemCounts", JSON.stringify(updatedItemCounts));
  };

  // Function to calculate ItemsRemaining dynamically
  const calculateItemsRemaining = (initialCount, itemsSold, itemCount) => {
    return initialCount - itemsSold - itemCount;
  };

  // Function to handle incrementing the item count
  const handleAdd = (itemId) => {
    // Increment the count for the clicked item
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: prevCounts[itemId] + 1,
    }));
  };

  // Function to handle decrementing the item count
  const handleMinus = (itemId) => {
    // Decrement the count for the clicked item
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: prevCounts[itemId] - 1,
    }));
  };

  // Function to render ItemsRemaining dynamically
  const renderItemsRemaining = (initialCount, itemsSold, itemCount) => {
    const remaining = calculateItemsRemaining(
      initialCount,
      itemsSold,
      itemCount
    );
    return remaining >= 0 ? remaining : 0;
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.container}>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpenDrawer(true)}
            className={classes.menuButton}
            style={{ position: "fixed", top: 0, left: 0 }}
          >
            <FaBars />
          </IconButton>
          <Drawer
            className={classes.drawer}
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.sidebar2}>
              <List>
                <ListItem button onClick={() => setActiveCookId(null)}>
                  <ListItemText primary="FOOD CATEGORY" />
                </ListItem>
                {uniqueCategoryIds.map((cookId) => (
                  <ListItem
                    key={cookId}
                    button
                    onClick={() => handleSidebarClick(cookId)}
                    // selected={activeCookId === cookId}
                  >
                    <ListItemText
                      primary={cookId}
                      style={{
                        color: activeCookId === cookId ? "black" : "grey",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </>
      ) : (
        <Paper className={classes.sidebar1} elevation={0}>
          <List>
            <ListItem button onClick={() => setActiveCookId(null)}>
              <ListItemText primary="FOOD CATEGORY" />
              <CustomUnderline text="food category" />
            </ListItem>

            {uniqueCategoryIds.map((cookId) => (
              <ListItem
                key={cookId}
                button
                onClick={() => handleSidebarClick(cookId)}
                // selected={activeCookId === cookId}
              >
                <ListItemText
                  primary={cookId}
                  style={{
                    color: activeCookId === cookId ? "black" : "grey",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <div className={classes.content}>
        {/* Search Box */}
        <Link to="/checkout">add to cart</Link>
        <div className={classes.searchContainer}>
          <TextField
            className={classes.searchInput}
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton
            color="primary"
            aria-label="search"
            onClick={() => setSearchQuery("")} // Clear search
          >
            <FaSearch />
          </IconButton>
        </div>
        {uniqueCategoryIds.map((cookId) => (
          <div
            key={`cookId_${cookId}`}
            id={`cookId_${cookId}`}
            style={{ paddingTop: "20px" }}
          >
            <Typography variant="h5" gutterBottom>
              {cookId} <CustomUnderline text="cook id" />
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {groupedByCategoryId[cookId]?.map((item) => (
                <Card key={item.id} className={classes.card}>
                  <div className={classes.imageContainer}>
                    {item.ImageUrlDisplay === "null" ? (
                      <img
                        src={AlterFoodImage}
                        alt={item.ItemName}
                        className={classes.mainImage}
                      />
                    ) : (
                      <img
                        src={item.ImageUrlDisplay || Image1}
                        // src="https://ep36-testbucket.s3.us-west-2.amazonaws.com/arabian/fotor-ai-20240513162615.jpg"
                        alt={item.ItemName}
                        className={classes.mainImage}
                      />
                    )}
                    {item.SpecialOffer != 0 && (
                      <img
                        src={SpecialOfferImage}
                        alt="Special Offer"
                        className={classes.specialOfferImage}
                      />
                    )}
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="h2">
                      {item.ItemName}
                    </Typography>
                    {/* <Typography color="textSecondary">
                      Price: {item.Price}
                    </Typography> */}
                    {item.SpecialOffer != 0 ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          color="textSecondary"
                          style={{
                            textDecoration: "line-through",
                            marginRight: "8px",
                          }}
                        >
                          ₹{parseFloat(item.Price).toFixed(2)}
                        </Typography>
                        <Typography color="primary">
                          ₹
                          {parseFloat(
                            item.Price - (item.SpecialOffer / 100) * item.Price
                          ).toFixed(2)}{" "}
                          <TbRosetteDiscountCheck />
                        </Typography>
                      </div>
                    ) : (
                      <Typography color="primary">
                        ₹{parseFloat(item.Price).toFixed(2)}
                      </Typography>
                    )}
                    <Typography color="textSecondary">
                      {/* Items Remaining :{" "}
                      {parseInt(item.CountPerDay) - parseInt(item.ItemsSold)} */}
                      Items Remaining :{" "}
                      {renderItemsRemaining(
                        parseInt(item.CountPerDay),
                        parseInt(item.ItemsSold),
                        itemCounts[item.id]
                      )}
                    </Typography>
                    <Typography>
                      {itemCounts[item.id] <=
                        parseInt(item.CountPerDay) - parseInt(item.ItemsSold)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {itemCounts[item.id] == 0 ? (
                      <Button
                        variant="contained"
                        className={classes.custombtn}
                        disableElevation
                        onClick={() => handleAddToCart(item.id)}
                      >
                        Add to Cart
                        <span style={{ marginLeft: "8px" }}>
                          <TbShoppingCartPlus style={{ fontSize: 20 }} />
                        </span>
                      </Button>
                    ) : (
                      <>
                        {itemCounts[item.id] > 0 && (
                          <Button
                            variant="contained"
                            className={classes.custombtn}
                            disableElevation
                            onClick={() => handleMinus(item.id)}
                          >
                            -
                          </Button>
                        )}
                        {itemCounts[item.id] !== 0 && (
                          <Typography>{itemCounts[item.id]}</Typography>
                        )}
                        {itemCounts[item.id] <
                          parseInt(item.CountPerDay) -
                            parseInt(item.ItemsSold) && (
                          <Button
                            variant="contained"
                            className={classes.custombtn}
                            disableElevation
                            onClick={() => handleAdd(item.id)}
                          >
                            +
                          </Button>
                        )}
                      </>
                    )}
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
