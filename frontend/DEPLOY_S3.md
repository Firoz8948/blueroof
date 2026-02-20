# Deploy BlueRoof Realty website to AWS S3

This app is already set up for **static export** (`output: 'export'` in `next.config.js`). Follow these steps to build and upload to an S3 bucket.

## Prerequisites

- **Node.js** (v18+) and npm installed
- **AWS CLI** installed and configured (`aws configure` with your Access Key and Secret)
- An **S3 bucket** for the website (create one in AWS Console if needed)

---

## 1. Build the static site

From the `frontend` folder:

```bash
npm install
npm run build
```

This creates an **`out`** folder with all static files (HTML, JS, CSS, images). Everything in `out/` is what you upload to S3.

---

## 2. Create and configure the S3 bucket (first time only)

### Option A: Using AWS Console

1. **Create bucket**
   - Go to [S3 Console](https://s3.console.aws.amazon.com/s3/)
   - Create bucket (e.g. `blueroof-realty-website`)
   - Choose a region (e.g. `ap-south-1` for India)
   - Leave “Block all public access” **unchecked** if you want public website hosting from S3 (or use Option B with CloudFront and keep block on)

2. **Enable static website hosting**
   - Open the bucket → **Properties**
   - Scroll to **Static website hosting** → Edit
   - Enable “Host a static website”
   - Index document: `index.html`
   - Error document: `404.html` (optional; or use `index.html` to let the app handle 404s)

3. **Bucket policy (for public read)**
   - Open the bucket → **Permissions** → **Bucket policy**
   - Use a policy like (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

### Option B: Using AWS CLI

Replace `YOUR-BUCKET-NAME` and `ap-south-1` with your bucket name and region.

```bash
# Create bucket
aws s3 mb s3://YOUR-BUCKET-NAME --region ap-south-1

# Enable static website hosting
aws s3 website s3://YOUR-BUCKET-NAME --index-document index.html --error-document 404.html
```

Then add the bucket policy above in the Console (Permissions → Bucket policy), or use:

```bash
# Save the policy to bucket-policy.json (edit YOUR-BUCKET-NAME first), then:
aws s3api put-bucket-policy --bucket YOUR-BUCKET-NAME --policy file://bucket-policy.json
```

---

## 3. Upload the site to S3

From the `frontend` folder, after `npm run build`:

```bash
aws s3 sync out/ s3://YOUR-BUCKET-NAME/ --delete
```

- `out/` is the build output folder.
- `--delete` removes files in S3 that are no longer in `out/` (keeps bucket in sync).

**Optional:** set cache headers for better performance:

```bash
aws s3 sync out/ s3://YOUR-BUCKET-NAME/ --delete --cache-control "public, max-age=31536000, immutable" --exclude "*.html" --exclude "*.json"
aws s3 sync out/ s3://YOUR-BUCKET-NAME/ --delete --cache-control "public, max-age=0, must-revalidate" --exclude "*" --include "*.html" --include "*.json"
```

(First line: long cache for assets; second: short cache for HTML/JSON.)

---

## 4. Get your website URL

- **S3 website endpoint:**  
  `http://YOUR-BUCKET-NAME.s3-website.REGION.amazonaws.com`  
  (e.g. `http://blueroof-realty-website.s3-website.ap-south-1.amazonaws.com`)

- For **HTTPS and a custom domain**, put **CloudFront** in front of the S3 website endpoint and add your domain (and SSL certificate in ACM).

---

## 5. One-command deploy (after first-time setup)

Set the bucket name (and optionally region) and run:

**PowerShell (Windows):**

```powershell
$BUCKET = "YOUR-BUCKET-NAME"
npm run build
aws s3 sync out/ "s3://$BUCKET/" --delete
```

**Bash (Mac/Linux):**

```bash
export BUCKET=YOUR-BUCKET-NAME
npm run build
aws s3 sync out/ "s3://$BUCKET/" --delete
```

You can also use the `deploy:s3` script below (after adding it to `package.json`).

---

## 6. Optional: npm deploy script

Add to `package.json` in the `"scripts"` section:

```json
"deploy:s3": "next build && aws s3 sync out/ s3://YOUR-BUCKET-NAME/ --delete"
```

In `package.json`, replace `YOUR-BUCKET-NAME` in the `deploy:s3` script with your actual bucket name. Then run:

```bash
npm run deploy:s3
```

---

## Summary checklist

| Step | Action |
|------|--------|
| 1 | `npm run build` in `frontend` |
| 2 | Create S3 bucket and enable “Static website hosting” |
| 3 | Add bucket policy for public read (if using S3 website URL) |
| 4 | `aws s3 sync out/ s3://YOUR-BUCKET-NAME/ --delete` |
| 5 | Open the S3 website URL (or CloudFront URL if configured) |

Your footer links use trailing slashes (e.g. `/privacy/`, `/terms/`) so they work correctly with S3 static website hosting.
