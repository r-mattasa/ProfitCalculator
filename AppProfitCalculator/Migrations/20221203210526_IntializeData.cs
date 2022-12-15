using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppProfitCalculator.Migrations
{
    /// <inheritdoc />
    public partial class IntializeData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProfitCalculatorResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KmPrice = table.Column<double>(type: "float", nullable: false),
                    HourPrice = table.Column<double>(type: "float", nullable: false),
                    TotalKm = table.Column<double>(type: "float", nullable: false),
                    TotalHours = table.Column<double>(type: "float", nullable: false),
                    Income = table.Column<double>(type: "float", nullable: false),
                    TotalDistanceCost = table.Column<double>(type: "float", nullable: false),
                    TotalTimeCost = table.Column<double>(type: "float", nullable: false),
                    TotalCost = table.Column<double>(type: "float", nullable: false),
                    Profit = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfitCalculatorResults", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProfitCalculatorResults");
        }
    }
}
