import React, { useState } from 'react';

const CreateItem = () => {
  const [formData, setFormData] = useState({
    ItemName: '',
    CookId: '',
    CategoryId: '',
    Price: '',
    CountPerDay: '',
    ItemsSold: '',
    Status: '',
    SpecialOffer: '',
    ImageUrlDisplay: '',
    ImageUrlPlatter: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://akshayapatra-itemfunction.azurewebsites.net/api/Akshayapatra-original-table?code=5X7nqsMQ4U3LV9VEOkjc1v6ecdsZcseWv5Y_jistQq5LAzFu2NwLHA%3D%3D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Data stored successfully.');
        setFormData({
          ItemName: '',
          CookId: '',
          CategoryId: '',
          Price: '',
          CountPerDay: '',
          ItemsSold: '',
          Status: '',
          SpecialOffer: '',
          ImageUrlDisplay: '',
          ImageUrlPlatter: ''
        });
      } else {
        alert('Failed to store data. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Post Data to API</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input type="text" name="ItemName" value={formData.ItemName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Cook ID:
          <input type="text" name="CookId" value={formData.CookId} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Category Name:
          <input type="text" name="CategoryId" value={formData.CategoryId} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" name="Price" value={formData.Price} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Count Per Day:
          <input type="text" name="CountPerDay" value={formData.CountPerDay} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Items Sold:
          <input type="text" name="ItemsSold" value={formData.ItemsSold} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Status:
          <input type="text" name="Status" value={formData.Status} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Special Offer:
          <input type="text" name="SpecialOffer" value={formData.SpecialOffer} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Image URL Display:
          <input type="text" name="ImageUrlDisplay" value={formData.ImageUrlDisplay} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Image URL Platter:
          <input type="text" name="ImageUrlPlatter" value={formData.ImageUrlPlatter} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateItem;
