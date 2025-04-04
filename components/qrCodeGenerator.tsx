"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Mail } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/button';

function QRCodeGenerator() {
  const [url, setUrl] = React.useState("https://www.example.com");
  const [color, setColor] = React.useState("#000000");
  const [bgColor, setBgColor] = React.useState("#ffffff");
  const [logo, setLogo] = React.useState(null);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [qrType, setQrType] = React.useState("link");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleEmailSubmit = () => {
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setUrl(mailToLink);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="flex-1 max-w-4xl mx-4 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-gray-800">
            Generate Your Own QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <Tabs
              defaultValue="link"
              className="space-y-6"
              onValueChange={(val) => setQrType(val)}
            >
              <TabsList className="h-12 w-full grid grid-cols-2 rounded-lg shadow-md bg-gray-100">
                <TabsTrigger
                  value="link"
                  className="font-semibold text-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Link className="mr-2 h-5 w-5" />
                  Link
                </TabsTrigger>
                <TabsTrigger
                  value="e-mail"
                  className="font-semibold text-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  E-mail
                </TabsTrigger>
              </TabsList>
              <TabsContent value="link">
                <div className="space-y-4">
                  <Label htmlFor="url" className="font-semibold text-lg text-gray-700">
                    URL
                  </Label>
                  <Input
                    id="url"
                    type="text"
                    placeholder="Enter your URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </TabsContent>
              <TabsContent value="e-mail">
                <div className="space-y-4">
                  <Label htmlFor="email" className="font-semibold text-lg text-gray-700">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Label htmlFor="subject" className="font-semibold text-lg text-gray-700">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Enter your subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Label htmlFor="message" className="font-semibold text-lg text-gray-700">
                    Message
                  </Label>
                  <Input
                    id="message"
                    type="text"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    onClick={handleEmailSubmit}
                  >
                    Generate QR Code
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            <div className="space-y-4">
              <Label htmlFor="color" className="font-semibold text-lg text-gray-700">
                QR Code Color
              </Label>
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-10 border-2 border-gray-300 rounded-lg shadow-sm"
              />
              <Label htmlFor="bgColor" className="font-semibold text-lg text-gray-700">
                Background Color
              </Label>
              <Input
                id="bgColor"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-16 h-10 border-2 border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="logo" className="font-semibold text-lg text-gray-700">
                Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setLogoFile(file);
                    setLogo(URL.createObjectURL(file));
                  }
                }}
                className="w-full border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-lg shadow-inner p-6">
            <QRCodeSVG
              value={url}
              size={250}
              fgColor={color}
              bgColor={bgColor}
              imageSettings={logo ? { src: logo, height: 50, width: 50, excavate: true } : undefined}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QRCodeGenerator;
