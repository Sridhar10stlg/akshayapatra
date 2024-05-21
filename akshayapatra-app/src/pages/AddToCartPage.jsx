import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import EmptyCart from "../assets/plate1.png";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import "../App.css";
import { GrPrevious, GrNext } from "react-icons/gr";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    // fontFamily: 'Lato, sans-serif',
    fontFamily: 'ProximaNova, arial, Helvetica Neue, sans-serif',
    backgroundColor: "#e9ecee", // Light grey background for the whole page
    // minHeight: "100vh", // Ensure the page takes up the full height of the viewport
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column", // Change to column direction on small screens
    },
  },
  stickyFooter: {
    position: "sticky",
    bottom: 0,
    [theme.breakpoints.down("sm")]: {
      position: "initial",
    },
  },
  cartContainer: {
    // fontFamily: 'Lato, sans-serif',
    fontFamily: 'ProximaNova, arial, Helvetica Neue, sans-serif',
    background: "radial-gradient(circle, #fff, #f3f3eb)", //041527   C59D5F
    flexBasis: "70%", // Fixed width for the cart container
    margin: "30px", // Add margin if needed
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Full width on small screens
      margin: "10px 0", // Adjust margin for small screens
    },
  },
  cartimage: {
    textAlign: "left",
    // backgroundColor: "white",
    flexBasis: "90%",
    // justifyContent: "center",
    // textAlign: "center",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%", // Full width on small screens
    },
  },
  itemimage: {
    maxWidth: "23%",
    position: "absolute", // Position items absolutely within the container
    transform: "translate(-50%, -50%)", // Center the items
  },
  tableContainer: {
    backgroundColor: "WHITE", // White background for the table
    padding: "20px",
    margin: "30px 0px 30px 0px",
    maxWidth: "100%",
    flexBasis: "30%",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    // flexBasis: "10%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "10px 0",
      // maxHeight: "60vh",
      // overflowY: "auto",
    },
  },
  tableScrollContainer: {
    maxHeight: "60vh", // Maximum height of the table container
    overflowY: "auto", // Enable vertical scroll
    [theme.breakpoints.down("sm")]: {
      maxHeight: "100vh",
      overflowY: "none",
    },
  },
  table: {
    borderCollapse: "collapse", // Remove table border
    textAlign: "center",
    justifyItems: "center",
    // width: "120%",
  },
  tableHead: {
    backgroundColor: "#f3f3eb",
    color: "#041527",
    // width: "100%",
  },
  tablebody: {
    // backgroundColor: "#b7b7b7",
  },
  tablePaper: {
    boxShadow: "none", // Remove box shadow from the table container
    borderRadius: "0px",
  },
  emptypage: {
    maxWidth: "50%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "0 25%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%", // Full width on small screens
      margin: "0", // No margin for small screens
    },
  },
  emptyimage: {
    width: "80%",
  },
  dtScButton: {
    backgroundColor: "#C59D5F",
    // borderRadius: "20px",
    color: "white",
    "&::before": {
      borderTop: "2px solid transparent",
      borderLeft: "2px solid transparent",
      transform: "translate(-50%, -50%)", // Initial position outside the button
    },
    "&::after": {
      borderBottom: "2px solid transparent",
      borderRight: "2px solid transparent",
      transform: "translate(50%, 50%)", // Initial position outside the button
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
  tablecell: {
    color: "#041527",
    // fontFamily: 'Lato, sans-serif',
    fontFamily: 'ProximaNova, arial, Helvetica Neue, sans-serif',
  },
  midline: {
    height: "2px",
    backgroundColor: "#041527",
    width: "100%",
  },
  footerContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 10px",
    borderTop: "1px solid #ddd",
    // boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
    // backgroundColor: "#f5f5f5",
  },
  footerLeft: {
    fontWeight: "bold",
    color: "#041527",
  },
  footerRight: {
    display: "flex",
    // justifyContent: "flex-end",
    // justifyContent: "flex-end",
    marginTop: "20px",
    justifyContent: "right",
    color: "#041527",
  },
  totalAmount: {
    fontWeight: "bold",
  },
  totalAmountContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
  },  
  itemPosition: {
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      "&.inside": {
        top: "calc(57%)",
        left: "calc(41%)",
      },
      "&.outside": {
        top: "calc(20%)",
        left: "calc(80%)",
      },
    },
    [theme.breakpoints.up("md")]: {
      "&.inside": {
        top: "calc(47%)",
        left: "calc(41%)",
      },
      "&.outside": {
        top: "calc(15%)",
        left: "calc(85%)",
      },
    },
  },
  paginationContainer: {
    padding: "10px 0px 0px 0px",
  },
  paginationButton: {
    // fontFamily: 'Lato, sans-serif',
    fontFamily: 'ProximaNova, arial, Helvetica Neue, sans-serif',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent', // Prevent default hover background color change
      boxShadow: 'none', // Prevent default hover box shadow
    },
    '&:focus': {
      backgroundColor: 'transparent', // Prevent focus background color change
      outline: 'none', // Prevent default focus outline
    },
    '&:active': {
      backgroundColor: 'transparent', // Prevent active background color change
      boxShadow: 'none', // Prevent active box shadow
    }
  }
}));

const AddToCartPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [buttonClicked, setButtonClicked] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("s");
  const outsideItems = ["Fish", "Vadai"];

  const ITEMS_PER_PAGE_INSIDE = 9;
  const ITEMS_PER_PAGE_OUTSIDE = 4;

  const [itemCounts, setItemCounts] = useState(() => {
    const storedItemCounts = localStorage.getItem("itemCounts");
    if (storedItemCounts) {
      return JSON.parse(storedItemCounts);
    } else {
      return {};
    }
  });

  const [selectedItemsDetails, setSelectedItemsDetails] = useState([]);

  const [radius, setRadius] = useState(160);
  const [itemHeight, setItemHeight] = useState(120);
  const [firstItemTopInside, setFirstItemTopInside] = useState("calc(47%)");
  const [firstItemLeftInside, setFirstItemLeftInside] = useState("calc(41%)");
  const [firstItemTopOutside, setFirstItemTopOutside] = useState("calc(15%)");
  const [firstItemLeftOutside, setFirstItemLeftOutside] = useState("calc(85%)");

  useEffect(() => {
    const updateRadiusAndPositions = () => {
      if (window.innerWidth <= 768) {
        setRadius(90); // Adjust the radius for mobile view
        setItemHeight(70);
      } else {
        setRadius(160); // Original radius for laptop view
        setItemHeight(120);
        setFirstItemTopInside("calc(47%)");
        setFirstItemLeftInside("calc(41%)");
        setFirstItemTopOutside("calc(15%)");
        setFirstItemLeftOutside("calc(85%)");
      }
    };

    updateRadiusAndPositions();
    window.addEventListener("resize", updateRadiusAndPositions);
    return () => window.removeEventListener("resize", updateRadiusAndPositions);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("change3");
      try {
        const response = await fetch(
          "https://akshayapatra-itemfunction.azurewebsites.net/api/Akshayapatra-original-table?code=5X7nqsMQ4U3LV9VEOkjc1v6ecdsZcseWv5Y_jistQq5LAzFu2NwLHA%3D%3D"
        );

        const responseData = await response.json();

        console.log("Response for cook Id",responseData);

        const selectedDetails = Object.entries(itemCounts).flatMap(
          ([itemId, count]) => {
            const selectedItem = responseData.find(
              (item) => item.id === itemId && count > 0
            );
            if (selectedItem) {
              const PricePerItem =
                parseFloat(selectedItem.Price) -
                parseFloat(selectedItem.Price) *
                  (parseFloat(selectedItem.SpecialOffer) / 100);
              return {
                itemId: selectedItem.id,
                itemName: selectedItem.ItemName,
                quantity: count,
                totalPrice: (PricePerItem * count).toFixed(2),
                price: PricePerItem,
                platterImage: selectedItem.ImageUrlPlatter,
                remainingCount:
                  parseInt(selectedItem.CountPerDay) -
                  parseInt(selectedItem.ItemsSold),
                categoryId: selectedItem.CategoryId,
                discount: selectedItem.SpecialOffer,
                CookId: selectedItem.CookId,
              };
            }
            return [];
          }
        );
        setSelectedItemsDetails(selectedDetails);
        console.log(selectedDetails);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleIncrement = (itemId) => {
    setButtonClicked((prevClicked) => ({
      ...prevClicked,
      [itemId]: true,
    }));
    setItemCounts((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [itemId]: prevCounts[itemId] + 1,
      };
      localStorage.setItem("itemCounts", JSON.stringify(updatedCounts));
      return updatedCounts;
    });

    setSelectedItemsDetails((prevDetails) => {
      // Find the index of the item being incremented
      const itemIndex = prevDetails.findIndex((item) => item.itemId === itemId);
      if (itemIndex !== -1) {
        // If the item is found, update its quantity and total price
        const updatedDetails = [...prevDetails];
        updatedDetails[itemIndex].quantity += 1;
        updatedDetails[itemIndex].totalPrice = (
          updatedDetails[itemIndex].price * updatedDetails[itemIndex].quantity
        ).toFixed(2);
        return updatedDetails;
      }
      return prevDetails;
    });

    setTimeout(() => {
      setButtonClicked((prevClicked) => ({
        ...prevClicked,
        [itemId]: false,
      }));
    }, 700);
  };

  const handleDecrement = (itemId) => {
    setButtonClicked((prevClicked) => ({
      ...prevClicked,
      [itemId]: true,
    }));
    if (itemCounts[itemId] === 1) window.location.reload();
    if (itemCounts[itemId] > 0) {
      setItemCounts((prevCounts) => {
        const updatedCounts = {
          ...prevCounts,
          [itemId]: prevCounts[itemId] - 1,
        };
        localStorage.setItem("itemCounts", JSON.stringify(updatedCounts));
        return updatedCounts;
      });
      setSelectedItemsDetails((prevDetails) => {
        // Find the index of the item being decremented
        const itemIndex = prevDetails.findIndex(
          (item) => item.itemId === itemId
        );
        if (itemIndex !== -1) {
          // If the item is found, update its quantity and total price
          const updatedDetails = [...prevDetails];
          updatedDetails[itemIndex].quantity -= 1;
          updatedDetails[itemIndex].totalPrice = (
            updatedDetails[itemIndex].price * updatedDetails[itemIndex].quantity
          ).toFixed(2);
          return updatedDetails;
        }
        return prevDetails;
      });
      setTimeout(() => {
        setButtonClicked((prevClicked) => ({
          ...prevClicked,
          [itemId]: false,
        }));
      }, 700);
    }
  };

  const subtotal = selectedItemsDetails.reduce(
    (accumulator, currentItem) =>
      accumulator + parseFloat(currentItem.totalPrice),
    0
  );

  const gstAndOtherCharges = (subtotal * 0.05).toFixed(2);
  const totalAmount = (+subtotal + +gstAndOtherCharges).toFixed(2);

  if (loading) {
    return <CircularProgress />;
  }

  if (Object.keys(selectedItemsDetails).length === 0) {
    console.log("No items");
    return (
      <div className={classes.emptypage}>
        <img
          className={classes.emptyimage}
          src={EmptyCart}
          alt="your cart is empty"
        />
        <Typography>Your Cart is Empty</Typography>
        <Typography style={{ color: "grey" }}>
          You can go to category page to select items as per your wish
        </Typography>
        <Link to="/categorypage">
          <Button color="primary">View Items</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate("/paymentgateway", {
      state: { selectedItemsDetails, totalAmount },
    });
  };

  // const firstItemTopInside = "calc(47%)"; 
  // const firstItemLeftInside = "calc(41%)"; 
  // const firstItemTopOutside = "calc(15%)";
  // const firstItemLeftOutside = "calc(85%)";

  const expandedInsideItems = selectedItemsDetails.reduce(
    (accumulator, item) => {
      if (!outsideItems.includes(item.categoryId)) {
        // filtering the outsideItems from the plate
        // Duplicate the item for each quantity
        for (let i = 0; i < item.quantity; i++) {
          accumulator.push({
            ...item,
            quantity: 1, // Reset quantity to 1 for each duplicated item
          });
        }
      }
      return accumulator;
    },
    []
  );

  const expandedOutsideItems = selectedItemsDetails.reduce(
    (accumulator, item) => {
      if (outsideItems.includes(item.categoryId)) {
        // filtering the outsideItems from the plate
        // Duplicate the item for each quantity
        for (let i = 0; i < item.quantity; i++) {
          accumulator.push({
            ...item,
            quantity: 1, // Reset quantity to 1 for each duplicated item
          });
        }
      }
      return accumulator;
    },
    []
  );

  console.log("Outside Items", expandedOutsideItems);

  console.log("Inside Items", expandedInsideItems);

  const startIndexInside = (currentPage - 1) * ITEMS_PER_PAGE_INSIDE;
  const endIndexInside = Math.min(
    startIndexInside + ITEMS_PER_PAGE_INSIDE,
    expandedInsideItems.length
  );

  const startIndexOutside = (currentPage - 1) * ITEMS_PER_PAGE_OUTSIDE;
  const endIndexOutside = Math.min(
    startIndexOutside + ITEMS_PER_PAGE_OUTSIDE,
    expandedOutsideItems.length
  );

  console.log("Selected Items",selectedItemsDetails);

  return (
    <div className={classes.pageContainer}>
      <div className={classes.cartContainer}>
        <div className={classes.paginationContainer}>
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={classes.paginationButton}
        > 
          <GrPrevious /> Prev
        </Button>
        <span style={{ fontSize: "15px", display: 'inline-block'}}>PLATTERS</span>
        <Button
          disabled={
            endIndexInside >= expandedInsideItems.length &&
            endIndexOutside >= expandedOutsideItems.length
          }
          onClick={() => setCurrentPage(currentPage + 1)}
          className={classes.paginationButton}
        >
          Next <GrNext />
        </Button>
        </div>
        <div className={classes.cartimage}>
          <img
            className={classes.emptyimage}
            src={EmptyCart}
            alt="your cart is empty"
          />
          {/* Display item images for the current page */}
          {expandedInsideItems
            .slice(startIndexInside, endIndexInside)
            .map((item, index) => {
              // Calculate the angle and position for each item image
              // const angle = ((index + startIndexInside) / selectedItemsDetails.length) * 2 * Math.PI;
              // const angle = ((index + startIndexInside)/8) * 2 * Math.PI;
              let angle, x, y;
              // const radius = 160; // Adjust the radius as needed

              if (index === 0) {
                // angle = Math.PI / 2;
                angle = 0;
                x = 0;
                y = 0;
              } else if (index === 1) {
                // angle = Math.PI / 2;
                angle = 0;
                x = radius * Math.cos(angle);
                y = radius * Math.sin(angle);
              } else {
                angle =
                  ((index - 1) / (ITEMS_PER_PAGE_INSIDE - 1)) * 2 * Math.PI; // Rest are positioned as before
                x = radius * Math.cos(angle);
                y = radius * Math.sin(angle);
              }

              return (
                <img
                  className={classes.itemimage}
                  key={`${index}-${item.itemId}`}
                  src={item.platterImage}
                  alt={`item image ${index}`}
                  style={{
                    top: `calc(${firstItemTopInside} + ${y}px)`,
                    left: `calc(${firstItemLeftInside} + ${x}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          {expandedOutsideItems
            .slice(startIndexOutside, endIndexOutside)
            .map((item, index) => {
              console.log(index);
              return (
                <img
                  className={classes.itemimage}
                  key={`${index}-${item.itemid}`}
                  src={item.platterImage}
                  alt={`item image ${index}`}
                  style={{
                    top: `calc(${firstItemTopOutside} + ${index * itemHeight}px)`,
                    left: `calc(${firstItemLeftOutside})`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
        </div>
      </div>
      <div className={classes.tableContainer}>
        <h3 className={classes.tablecell}>ITEMS IN THE CART</h3>
        <div className={classes.tableScrollContainer}>
          <TableContainer component={Paper} className={classes.tablePaper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableHead}>
                  <TableCell className={classes.tablecell} colSpan={1.5}>
                    Item Name
                  </TableCell>
                  {/* <TableCell>Item Price</TableCell> */}
                  <TableCell
                    className={classes.tablecell}
                    colSpan={2}
                    align="left"
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    className={classes.tablecell}
                    colSpan={3}
                    align="center"
                  >
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tablebody}>
                {selectedItemsDetails.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className={classes.tablecell}>
                      {item.itemName}
                    </TableCell>
                    {/* <TableCell>{item.price}</TableCell> */}
                    {/* <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDecrement(item.itemId)}
                      disabled={buttonClicked[item.itemId]}
                    >
                      -
                    </Button>{" "}
                    {item.quantity}{" "}
                    {item.quantity < item.remainingCount && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleIncrement(item.itemId)}
                        disabled={buttonClicked[item.itemId]}
                      >
                        +
                      </Button>
                    )}
                  </TableCell> */}
                    <TableCell className={classes.tablecell} colSpan={2}>
                      {/* {item.quantity > 1 ? (
                      <FaRegSquareMinus
                        onClick={() => handleDecrement(item.itemId)}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />
                    ) : (
                      <FaRegSquareMinus
                        onClick={() => {
                          handleDecrement(item.itemId);
                          window.location.reload();
                        }}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />
                    )} */}
                      {item.quantity > 0 && (
                        <FaRegSquareMinus
                          onClick={() => handleDecrement(item.itemId)}
                          style={{ cursor: "pointer", marginRight: "5px" }}
                        />
                      )}
                      <span
                        style={{
                          minWidth: "20px",
                          display: "inline-block",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      {item.quantity < item.remainingCount && (
                        <FaRegSquarePlus
                          onClick={() => handleIncrement(item.itemId)}
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                        />
                      )}
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      colSpan={3}
                      align="right"
                    >
                      ₹{item.totalPrice}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className={classes.tableHead}>
                  <TableCell className={classes.tablecell} colSpan={2}>
                    Item Total
                  </TableCell>
                  <TableCell
                    className={classes.tablecell}
                    colSpan={3}
                    align="right"
                  >
                    ₹{subtotal.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableHead}>
                  <TableCell className={classes.tablecell} colSpan={3}>
                    GST and Other Charges
                  </TableCell>
                  <TableCell
                    className={classes.tablecell}
                    colSpan={2}
                    align="right"
                  >
                    {/* ₹{(subtotal * (5 / 100)).toFixed(2)} */}₹
                    {gstAndOtherCharges}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
         <div className={classes.stickyFooter}>
          <div className={classes.footerContainer}>
            <hr className={classes.midline} /><br />
            <div className={classes.totalAmountContainer}>
              <Typography variant="h7" className={classes.footerLeft}>
                TO PAY
              </Typography>
              <Typography variant="h7" className={classes.totalAmount}>
              ₹{totalAmount}
              </Typography>
            </div>
            <div className={classes.footerRight}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPage;
