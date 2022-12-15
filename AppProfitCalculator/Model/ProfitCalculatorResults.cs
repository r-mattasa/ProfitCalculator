using Microsoft.Identity.Client;

namespace AppProfitCalculator.Model
{
    public class ReceivedBid
    {
        public double KmPrice { get; set; }

        public double HourPrice { get; set; }

        public double TotalKm { get; set; }

        public double TotalHours { get; set; }

        public double Income { get; set; }
    }

    public class ProfitReport : ReceivedBid
    {
        public int Id { get; set; }
        public double TotalDistanceCost { get; set; }

        public double TotalTimeCost { get; set; }

        public double TotalCost { get; set; }

        public double Profit { get; set; }
    }

    public class ProfitMargin
    {
        public double Income { get; set; }

        public double Profit { get; set; }

        public double ExpectedProfit { get; set; }
    }
}
