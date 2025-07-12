using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkinApi.Data;

namespace SkinApi.Controllers;

[ApiController]
[Route("champions")]
public class ChampionController : ControllerBase
{
    private readonly DataContext _context;
    public ChampionController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        return Ok(await _context.Champions.ToListAsync());
    }
}