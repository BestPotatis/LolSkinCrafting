using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkinApi.Data;
using SkinApi.DTOs;

namespace SkinApi.Controllers;

[ApiController]
[Route("skin-shards")]
public class SkinShardController : ControllerBase
{
    private readonly DataContext _context;
    public SkinShardController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var skinShards = await _context.SkinShards.Include(s => s.Champion.Skins).ToListAsync();
        var skinShardsHasSkin = new List<SkinShardDTO>();
        foreach (var skinShard in skinShards)
        {
            skinShardsHasSkin.Add(new SkinShardDTO
            {
                Name = skinShard.Name,
                Champion = skinShard.Champion.Name,
                Rarity = skinShard.Rarity,
                Legacy = skinShard.Legacy,
                DisenchantPrice = skinShard.DisenchantPrice,
                Price = skinShard.Price,
                HasSkin = skinShard.Champion.Skins.Count > 0,
                BestSkinRarity = skinShard.Champion.Skins.OrderBy(s => s.Rarity).FirstOrDefault()?.Rarity
            });
        }
        return Ok(skinShardsHasSkin);
    }
}