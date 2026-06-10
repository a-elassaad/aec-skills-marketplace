$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\a.elassaad\Desktop\aec-mp'
git init -q
git add .
git -c user.name='a-elassaad' -c user.email='elassaad.ahmed@gmail.com' commit -q -m 'Add AEC skills marketplace'
git branch -M main

Write-Output '=== getting GitHub credential (popup may appear) ==='
$cred = "protocol=https`nhost=github.com`n`n" | git credential fill 2>$null
$tokenLine = ($cred | Select-String '^password=')
$userLine  = ($cred | Select-String '^username=')
if (-not $tokenLine) { Write-Output 'NO_TOKEN'; exit 1 }
$token = $tokenLine.ToString().Substring(9)
$user  = if ($userLine) { $userLine.ToString().Substring(9) } else { 'a-elassaad' }
Write-Output "AUTH_OK user=$user"

$headers = @{ Authorization = "Bearer $token"; 'User-Agent' = 'claude-setup'; Accept = 'application/vnd.github+json' }
$body = '{"name":"aec-skills-marketplace","private":false,"description":"AEC skills marketplace for Claude"}'
try {
  $r = Invoke-RestMethod -Method Post -Uri 'https://api.github.com/user/repos' -Headers $headers -Body $body -ContentType 'application/json'
  Write-Output "REPO_CREATED $($r.full_name)"
} catch {
  Write-Output "REPO_CREATE_NOTE $($_.Exception.Message)"
}

git remote remove origin 2>$null
git remote add origin "https://github.com/$user/aec-skills-marketplace.git"
git push -u origin main 2>&1
Write-Output "DONE_URL https://github.com/$user/aec-skills-marketplace"
