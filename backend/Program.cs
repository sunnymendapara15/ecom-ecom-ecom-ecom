using Backend.Models;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
  options.AddPolicy("LocalDev", policy =>
    policy.AllowAnyOrigin()
      .AllowAnyMethod()
      .AllowAnyHeader());
});

var app = builder.Build();
app.UseCors("LocalDev");

var products = new List<Product>
{
  new Product(
    1,
    "Lunar Sneakers",
    "Feather-light sneakers for quick daily runs and layered outfits.",
    120m,
    "Footwear",
    "https://images.unsplash.com/photo-1528701800489-20e5d3a42f5d?auto=format&fit=crop&w=800&q=80"
  ),
  new Product(
    2,
    "Arcadia Backpack",
    "Weatherproof backpack with a padded laptop compartment and modular pockets.",
    95m,
    "Accessories",
    "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80"
  ),
  new Product(
    3,
    "Northwind Hoodie",
    "Relaxed-fit hoodie spun from cloud-soft cotton with a tonal logo badge.",
    78m,
    "Apparel",
    "https://images.unsplash.com/photo-1520975916085-3e1803a47a14?auto=format&fit=crop&w=800&q=80"
  ),
  new Product(
    4,
    "Solstice Sunglasses",
    "Lightweight acetate frames with polarized lenses for bright commutes.",
    68m,
    "Accessories",
    "https://images.unsplash.com/photo-1502804440705-ae3f7c809619?auto=format&fit=crop&w=800&q=80"
  )
};

app.MapGet("/api/products", () => Results.Ok(products));

app.MapPost("/api/orders", (OrderRequest order) =>
{
  if (order.Items == null || !order.Items.Any())
  {
    return Results.BadRequest(new { message = "Your cart is empty." });
  }

  var totalItems = order.Items.Sum(item => item.Quantity);
  var orderId = Guid.NewGuid().ToString("N")[..8];

  var receipt = new
  {
    orderId,
    message = $"Thanks {order.CustomerName}, we received {totalItems} item(s) from {order.Email ?? "your account"}."
  };

  return Results.Ok(receipt);
});

app.Run("http://localhost:5000");
