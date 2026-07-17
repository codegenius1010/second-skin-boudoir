-- Fix Aaliyah Chiarito's session date - add 1 day (from 8/2 to 8/3)
UPDATE "PhotographySession" 
SET "sessionDate" = "sessionDate" + INTERVAL '1 day'
WHERE "clientId" IN (
  SELECT "id" FROM "Client" 
  WHERE "firstName" = 'Aaliyah' AND "lastName" = 'Chiarito'
) AND "sessionDate" IS NOT NULL;
