#!/usr/bin/env pwsh
Set-Location $PSScriptRoot
& "$PSScriptRoot\node_modules\.bin\vite.cmd" --host 0.0.0.0 --port 8080