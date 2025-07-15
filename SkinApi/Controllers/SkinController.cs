using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkinApi.Data;
using SkinApi.DTOs;
using SkinApi.Models;

namespace SkinApi.Controllers;

[ApiController]
[Route("skins")]
public class SkinController : ControllerBase
{
    private readonly DataContext _context;

    public SkinController(DataContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> Store([FromBody] CreateSkinDTO request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var newSkin = new Skin { Name = request.Name, Legacy = request.Legacy, ChampionId = request.ChampionId!.Value, Rarity = request.Rarity!.Value };
        _context.Skins.Add(newSkin);
        return Ok(await _context.SaveChangesAsync());
    }
}