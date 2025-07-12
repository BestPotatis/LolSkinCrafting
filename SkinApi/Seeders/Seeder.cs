using SkinApi.Data;

namespace SkinApi.Seeders;

public static class Seeder
{
    public static void Seed(DataContext context)
    {
        ChampionSeeder.Seed(context);
    }
}