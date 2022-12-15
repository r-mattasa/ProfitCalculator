using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AppProfitCalculator.Model;

namespace AppProfitCalculator.Data
{
    public class AppProfitCalculatorContext : DbContext
    {
        public AppProfitCalculatorContext (DbContextOptions<AppProfitCalculatorContext> options)
            : base(options)
        {
        }

        public DbSet<AppProfitCalculator.Model.ProfitReport> ProfitCalculatorResults { get; set; } = default!;
    }
}
