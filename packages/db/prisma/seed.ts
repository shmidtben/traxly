import { PrismaClient, Role, CuratorStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Admin user (replace clerk_id with your actual Clerk user ID after signup)
  const admin = await prisma.user.upsert({
    where: { email: "admin@traxly.live" },
    update: {},
    create: {
      clerk_id: "placeholder_clerk_admin_id",
      email: "admin@traxly.live",
      name: "Traxly Admin",
      role: Role.ADMIN,
    },
  });
  console.log("Admin user:", admin.id);

  // Sample curator user
  const curatorUser = await prisma.user.upsert({
    where: { email: "curator@example.com" },
    update: {},
    create: {
      clerk_id: "placeholder_clerk_curator_id",
      email: "curator@example.com",
      name: "Sample Curator",
      role: Role.CURATOR,
      curator_profile: {
        create: {
          status: CuratorStatus.APPROVED,
          bio: "Deep house and techno specialist with 10k+ Spotify followers",
          genres: ["deep house", "techno", "minimal"],
          spotify_url: "https://open.spotify.com/user/samplecurator",
          credibility_score: 0.75,
          total_reviews: 12,
          max_weekly_reviews: 10,
          application_why: "I run three deep house playlists and want to help artists get real feedback.",
          application_link: "https://open.spotify.com/user/samplecurator",
        },
      },
    },
  });
  console.log("Sample curator:", curatorUser.id);

  // Sample artist user
  const artistUser = await prisma.user.upsert({
    where: { email: "artist@example.com" },
    update: {},
    create: {
      clerk_id: "placeholder_clerk_artist_id",
      email: "artist@example.com",
      name: "Sample Artist",
      role: Role.ARTIST,
      artist_profile: {
        create: {
          bio: "Electronic producer based in Berlin",
          genres: ["deep house", "organic house"],
          spotify_url: "https://open.spotify.com/artist/sampleartist",
        },
      },
    },
  });
  console.log("Sample artist:", artistUser.id);

  // Sample waitlist entries
  await prisma.waitlistEntry.createMany({
    skipDuplicates: true,
    data: [
      { type: "artist", name: "Test Artist", email: "testartist@example.com" },
      {
        type: "curator",
        name: "Test Curator",
        email: "testcurator@example.com",
        genre: "deep house",
        link: "https://open.spotify.com/user/testcurator",
        why: "I want to help artists with real feedback.",
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
