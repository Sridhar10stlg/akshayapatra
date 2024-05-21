import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { MdEdit, MdDelete } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri"; // For close button
import { BiImage } from "react-icons/bi"; // For view image button
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  actions: {
    marginTop: "auto",
    right: 0,
  },
  image: {
    height: 200,
    objectFit: "cover",
  },
  dialogHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogImage: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const CookHomePage = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState("");
  const cookId = 11111;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://akshayapatra-itemfunction.azurewebsites.net/api/Akshayapatra-original-table?code=5X7nqsMQ4U3LV9VEOkjc1v6ecdsZcseWv5Y_jistQq5LAzFu2NwLHA%3D%3D"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const filterData = data.filter((item) => parseInt(item.CookId) === cookId);
        console.log(filterData);
        setItems(filterData);
      } else {
        console.error("Failed to fetch data");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    console.log(itemId);
    try {
      const response = await fetch(
        "https://akshayapatra-itemfunction.azurewebsites.net/api/Akshayapatra-original-table?code=5X7nqsMQ4U3LV9VEOkjc1v6ecdsZcseWv5Y_jistQq5LAzFu2NwLHA%3D%3D",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: itemId }),
        }
      );

      console.log(response);

      if (response.ok) {
        // Remove the deleted item from the state
        setItems(items.filter((item) => item.id !== itemId));
        alert("Item deleted successfully.");
      } else {
        alert("Failed to delete item. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleViewImage = (imageUrl, itemName) => {
    setSelectedImage(imageUrl);
    setSelectedItemName(itemName);
    setOpenDialog(true);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h3>
        <Link to={`/create-item`}>Create Item</Link>
      </h3>
      <h2>Items</h2>
      {items.map((item, index) => (
        <Card key={index} className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {item.ItemName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ID: {item.id}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Cook ID: {item.CookId}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Category ID: {item.CategoryId}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price: {item.Price}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Count Per Day: {item.CountPerDay}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Items Sold: {item.ItemsSold}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Status: {item.Status}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Special Offer: {item.SpecialOffer}
            </Typography>
            {(item.ImageUrlDisplay!="null" && item.ImageUrlDisplay!="") ? (
                <Typography variant="body2" color="textSecondary" component="p">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BiImage />} // Use BiImage icon for view image button
                  onClick={() => handleViewImage(item.ImageUrlDisplay, item.ItemName)}
                >
                  View Image
                </Button>
              </Typography>
            ): (
                <Typography>No main image Uploaded for this item.</Typography>
            )}
            {(item.ImageUrlPlatter!="null" && item.ImageUrlPlatter!="") ? (
                <Typography variant="body2" color="textSecondary" component="p">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<BiImage />} // Use BiImage icon for view image button
                  onClick={() => handleViewImage(item.ImageUrlPlatter, item.ItemName)}
                >
                  View Platter Image
                </Button>
              </Typography>
            ): (
                <Typography>No platter image Uploaded for this item.</Typography>
            )}
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              aria-label="edit"
              component={Link}
              to={`/update-item/${item.id}`}
            >
              <TbEdit />
              Edit
            </Button>
            <Button
              aria-label="delete"
              onClick={() => handleDelete(item.id)}
            >
              <RiDeleteBin5Line />
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <div className={classes.dialogHeader}>
            <Typography variant="h6">{selectedItemName}</Typography>
            <IconButton
              edge="end"
              aria-label="close"
              onClick={() => setOpenDialog(false)}
            >
              <RiCloseLine />
            </IconButton>
          </div>
          <img
            src={selectedImage}
            alt="Selected"
            className={classes.dialogImage}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CookHomePage;
