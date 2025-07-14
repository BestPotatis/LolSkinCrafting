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
    public async void Store(CreateSkinDTO request)
    {
        Console.WriteLine(request);
        var newSkin = new Skin { Name = request.Name, ChampionId = request.ChampionId, Rarity = request.Rarity };
        _context.Skins.Add(newSkin);
        await _context.SaveChangesAsync();
    }
}