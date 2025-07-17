using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkinApi.Data;
using SkinApi.DTOs;
using SkinApi.Models;

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
                Id = skinShard.Id,
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

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> Store(CreateSkinShardDTO request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var newSkinShard = new SkinShard
        {
            Name = request.Name,
            Legacy = request.Legacy,
            ChampionId = request.ChampionId!.Value,
            Rarity = request.Rarity!.Value,
            DisenchantPrice = request.DisenchantPrice!.Value,
            Price = request.Price!.Value
        };
        _context.SkinShards.Add(newSkinShard);
        return Ok(await _context.SaveChangesAsync());
    }

    [HttpDelete]
    [Route("delete/{skinShardId}")]
    public async Task<IActionResult> Destroy(int skinShardId)
    {
        var skinShard = await _context.SkinShards.Where(s => s.Id == skinShardId).FirstAsync();
        _context.SkinShards.Remove(skinShard);
        return Ok(await _context.SaveChangesAsync());
    }

}