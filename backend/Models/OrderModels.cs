using System.Collections.Generic;

namespace Backend.Models;

public record OrderItem(int ProductId, int Quantity);
public record OrderRequest(string CustomerName, string Email, List<OrderItem>? Items);
