-- Undo the previous +1 day migration
-- Subtract 1 day to restore correct dates with UTC midnight approach
UPDATE "PhotographySession" 
SET "sessionDate" = "sessionDate" - INTERVAL '1 day'
WHERE "sessionDate" IS NOT NULL;
