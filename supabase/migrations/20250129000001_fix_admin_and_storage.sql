-- Fix admin policies to allow viewing all applications without email restriction
-- Drop old admin policies
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
DROP POLICY IF EXISTS "Admins can update all applications" ON applications;

-- Create new admin policies that work with session storage
CREATE POLICY "Allow all authenticated users to view all applications"
  ON applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow all authenticated users to update applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (true);

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for application documents
CREATE POLICY "Users can upload their own documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'application-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can view their own documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'application-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Public can view all documents"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'application-documents');

CREATE POLICY "Users can delete their own documents"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'application-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
