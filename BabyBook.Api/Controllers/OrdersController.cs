using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BabyBook.Api.Controllers
{
    [RoutePrefix("api/Orders")]
    public class OrdersController : ApiController
    {
        //[Authorize]
        //[Route("")]
        public IHttpActionResult Get()
        {
            return Ok(Order.CreateOrders());
        }

    }

    #region Helpers

    public class Order
    {
        public int OrderID { get; set; }
        public string CustomerName { get; set; }
        public string ShipperCity { get; set; }
        public Boolean IsShipped { get; set; }
        public List<Product> Products { get; set; }

        public static List<Order> CreateOrders()
        {
            List<Product> myProducts = new List<Product>
            {
                new Product {ProductID = 1, ProductName = "Product1"},
                new Product {ProductID = 1, ProductName = "Product2"}
            };

            List<Order> OrderList = new List<Order> 
            {
                new Order {OrderID = 10248, CustomerName = "Taiseer Joudeh", ShipperCity = "Amman", IsShipped = true , Products =  myProducts},
                new Order {OrderID = 10249, CustomerName = "Ahmad Hasan", ShipperCity = "Dubai", IsShipped = false, Products =  myProducts},
                new Order {OrderID = 10250,CustomerName = "Tamer Yaser", ShipperCity = "Jeddah", IsShipped = false , Products =  myProducts},
                new Order {OrderID = 10251,CustomerName = "Lina Majed", ShipperCity = "Abu Dhabi", IsShipped = false, Products =  myProducts},
                new Order {OrderID = 10252,CustomerName = "Yasmeen Rami", ShipperCity = "Kuwait", IsShipped = true, Products =  myProducts}
            };

            return OrderList;
        }


    }

    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
    }

    #endregion
}
