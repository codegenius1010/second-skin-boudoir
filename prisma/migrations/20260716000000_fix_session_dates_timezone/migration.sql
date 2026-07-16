-- Fix existing session dates that were stored with UTC timezone offset
-- Add 1 day to all sessions to correct the off-by-one day error
UPDATE "PhotographySession" 
SET "sessionDate" = "sessionDate" + INTERVAL '1 day'
WHERE "sessionDate" IS NOT NULL;
