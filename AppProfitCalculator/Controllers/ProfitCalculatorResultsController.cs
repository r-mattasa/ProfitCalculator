using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppProfitCalculator.Data;
using AppProfitCalculator.Model;
using System.Security.Cryptography;
using System.Net.Http;
using System.Net.Http.Headers;

namespace AppProfitCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfitCalculatorResultsController : ControllerBase
    {
        private readonly AppProfitCalculatorContext _context;

        public ProfitCalculatorResultsController(AppProfitCalculatorContext context)
        {
            _context = context;
        }

       public static double GetTotalDistanceBasedCosts(double pricePerKm, double TotalKm)
        {
            double TotalDistanceCosts = (TotalKm * pricePerKm);

            return TotalDistanceCosts;
        }

        public static double GetTotalTimeBasedCosts(double pricePerHour, double TotalHours)
        {
            double TotalTimeCosts = (TotalHours * pricePerHour);

            return TotalTimeCosts;
        }

        public static double GetProfit(double Income, double TC)
        {
            double profit = (Income - TC);
            return profit;
        }



        // GET: api/ProfitCalculatorResults
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfitReport>>> GetProfitCalculatorResults()
        {
           
            return await _context.ProfitCalculatorResults.ToListAsync();
        }

        // GET: api/ProfitCalculatorResults/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProfitReport>> GetProfitCalculatorResults(int id)
        {
            var profitCalculatorResults = await _context.ProfitCalculatorResults.FindAsync(id);

            if (profitCalculatorResults == null)
            {
                return NotFound();
            }

            return profitCalculatorResults;
        }

        // PUT: api/ProfitCalculatorResults/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfitCalculatorResults(int id, ProfitReport profitCalculatorResults)
        {
            /*if (id != profitCalculatorResults)
            {
                return BadRequest();
            }*/

            _context.Entry(profitCalculatorResults).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfitCalculatorResultsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProfitCalculatorResults
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProfitReport>> PostProfitReport(ReceivedBid bid)
        {

            if (bid == null)
            {
                return BadRequest();
            }

            ProfitReport result = new ProfitReport();

            _context.ProfitCalculatorResults.Add(result);
            await _context.SaveChangesAsync();
            result.TotalDistanceCost = GetTotalDistanceBasedCosts(bid.KmPrice, bid.TotalKm);
            result.TotalTimeCost = GetTotalTimeBasedCosts(bid.HourPrice, bid.TotalHours);
            result.TotalCost = result.TotalDistanceCost + result.TotalTimeCost;
            result.Profit = GetProfit(bid.Income, result.TotalCost);

            return Ok(result);
            //return CreatedAtAction("GetProfitCalculatorResults", new { id = result.Id }, result);
        }

        // DELETE: api/ProfitCalculatorResults/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfitCalculatorResults(int id)
        {
            var profitCalculatorResults = await _context.ProfitCalculatorResults.FindAsync(id);
            if (profitCalculatorResults == null)
            {
                return NotFound();
            }

            _context.ProfitCalculatorResults.Remove(profitCalculatorResults);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // GET: api/ProfitCalculatorResults/Margin
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("ProfitMargin")]
        public async Task<ActionResult<ProfitReport>> PostGetExpectedIncome(ProfitMargin profitMargin)
        {

            if (profitMargin == null)
            {
                return BadRequest();
            }

            await _context.SaveChangesAsync();

            double expectedIncome = profitMargin.Income + (profitMargin.ExpectedProfit - profitMargin.Profit);
            return Ok(new { expectedIncome });

        }

        [HttpPost("saveOrder")]
        public async Task<ActionResult<ProfitReport>> SaveProfitReport(ProfitReport pr)
        {

            if (pr == null)
            {
                return BadRequest();
            }

            _context.ProfitCalculatorResults.Add(pr);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfitCalculatorResults", new { id = pr.Id }, pr);
        }

        private bool ProfitCalculatorResultsExists(int id)
        {
            return _context.ProfitCalculatorResults.Any(e => e.Id == id);
        }
    }
}
