using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkinApi.Data;
using SkinApi.DTOs;
using SkinApi.Models;

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
        var champions = await _context.Champions.OrderBy(c => c.Name).Include(c => c.Skins).ToListAsync();
        var championWithSkins = new List<ChampionWithSkinDTO>();
        foreach (var champion in champions)
        {
            championWithSkins.Add(new ChampionWithSkinDTO
            {
                Id = champion.Id,
                Name = champion.Name,
                NumberOfSkins = champion.Skins.Count,
                BestSkin = champion.Skins.OrderBy(s => s.Rarity).FirstOrDefault()
            });
        }
        return Ok(championWithSkins);
    }
}